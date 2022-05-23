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

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/^\/fights$/gm, async (msg) => {
  const chatId = msg.chat.id;
  let formattedResponse = '';
  formattedResponse += 'Next Events: \n';

  try {    
    await axios.get('https://mma-fights-scraper-api.herokuapp.com/api/fights')
      .then(({ data }) => data.forEach((fight: typeof data, index: number) => {        
        // formattedResponse += '\n';
        const { title, date, time, fightNight, url } = fight;
        const dateObj = new Date(date);
        const formattedLine = `\n FightId: ${index + 1} | MainFight: ${title} | Date: ${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()} | Time: ${time} | EventType: ${fightNight ? 'UFC-FightNight' : 'UFC'} | EventLink: ${url} \n`;
        formattedResponse += formattedLine;
      }));
  } catch (err) {
    return bot.sendMessage(chatId, 'Something went wrong, try again in a few minutes');
  }

  bot.sendMessage(chatId, formattedResponse);
});

bot.onText(/^\/fightCard\/[0-9]$/gm, async (msg, match) => {
  const fightId = match && match[0].split('/')[2];
  const chatId = msg.chat.id;
  let formattedResponse = '';
  let fightById = [];

  try {    
    fightById = (await axios.get(`https://mma-fights-scraper-api.herokuapp.com/api/fights-card/${Number(fightId) - 1}`).then(({ data }) => data)).card;
  } catch (err) {
    return bot.sendMessage(chatId, 'Something went wrong, try again in a few minutes');
  }

  fightById.forEach(({ redCornerName, blueCornerName }: IFightCard, index: number) => {
    formattedResponse += `${index === 0 ? 'Main Fight: ' : ''}${redCornerName.length <= 1 ? 'TBA' : redCornerName} vs ${blueCornerName.length <= 1 ? 'TBA' : blueCornerName}\n`;
  });

  bot.sendMessage(chatId, formattedResponse);
});

bot.onText(/^((?!\/fights|\/fights-card).)*$/gm, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Use the commands /fights or /fightCard/(FightId)');
});

api.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

export default api;