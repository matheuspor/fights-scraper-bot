import express from 'express';
import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { IFightCard } from './interfaces';

const api = express();
api.disable('x-powered-by');
api.use(express.json());

const PORT = process.env.PORT || 3001;

const BOT_TOKEN = process.env.BOT_TOKEN || '';

const bot = new TelegramBot(BOT_TOKEN, { polling: true, onlyFirstMatch: true });

bot.onText(/^\/events$/gm, async (msg) => {
  const chatId = msg.chat.id;
  let formattedResponse = '';
  formattedResponse += 'Next Events: \n';

  try {
    await axios.get('https://mma-fights-scraper-api.herokuapp.com/api/events')
      .then(({ data }) => data
        .forEach(({ _id, title, date, time, fightNight, url }: typeof data) => {
          const dateObj = new Date(date);
          const formattedLine = `\nEventId: ${_id} \nMainFight: ${title} \nDate: ${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()} \nTime: ${time} \nEventType: ${fightNight ? 'UFC-FightNight' : 'UFC'} \nEventLink: ${url} \n`;
          formattedResponse += formattedLine;
        }));
  } catch (err) {
    return bot.sendMessage(chatId, 'Something went wrong, try again in a few minutes');
  }

  bot.sendMessage(chatId, formattedResponse);
});

bot.onText(/^\/eventFights\/[0-9]$/gm, async (msg, match) => {
  const eventId = match && match[0].split('/')[2];
  const chatId = msg.chat.id;
  let formattedResponse = '';
  let fightById = [];

  try {
    fightById = (await axios.get(`https://mma-fights-scraper-api.herokuapp.com/api/fights-card/${eventId}`).then(({ data }) => data)).fights;
  } catch (err) {
    return bot.sendMessage(chatId, 'Something went wrong, try again in a few minutes');
  }

  fightById.forEach(({ redCornerFighter, blueCornerFighter }: IFightCard, index: number) => {
    formattedResponse += `${index === 0 ? 'Main Fight: ' : ''}${redCornerFighter.length <= 1 ? 'TBA' : redCornerFighter} vs ${blueCornerFighter.length <= 1 ? 'TBA' : blueCornerFighter}\n`;
    formattedResponse += '\n';
  });

  bot.sendMessage(chatId, formattedResponse);
});

bot.onText(/.+/gm, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Use the commands /events or /eventFights/(EventId) \nExample: /eventFights/1');
});

api.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

export default api;