import express from 'express';
import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { IEvents, IFightCard } from './interfaces';
import { formatEventFightsResponse, formatEventsResponse } from './helpers';

const api = express();
api.disable('x-powered-by');
api.use(express.json());

const PORT = process.env.PORT || 3001;

const BOT_TOKEN = process.env.BOT_TOKEN || '';

const bot = new TelegramBot(BOT_TOKEN, { polling: true, onlyFirstMatch: true });

bot.onText(/^\/events$/gm, async (msg) => {  
  const chatId = msg.chat.id;
  let messageSent = false;
  setTimeout(() => {
    if (!messageSent) {
      bot.sendMessage(chatId, 'Wait a few more seconds...');
    }
  }, 5000);
  let events = [] as IEvents[];
  let formattedResponse = 'Next Events: \n';

  try {
    events = await axios.get('https://mma-fights-scraper-api.herokuapp.com/api/events')
      .then(({ data }) => data);
  } catch (err) {
    return bot.sendMessage(chatId, 'Something went wrong, try again in a few minutes');
  }

  formattedResponse = formatEventsResponse(events);

  bot.sendMessage(chatId, formattedResponse);
  messageSent = true;
});

bot.onText(/^\/eventFights\/[0-9]$/gm, async (msg, match) => {
  const eventId = match && match[0].split('/')[2];
  const chatId = msg.chat.id;
  let formattedResponse = '';
  let eventById = [] as IFightCard[];

  try {
    eventById = (await axios.get(`https://mma-fights-scraper-api.herokuapp.com/api/fights-card/${eventId}`).then(({ data }) => data)).fights;
  } catch (err) {
    return bot.sendMessage(chatId, 'Something went wrong, try again in a few minutes');
  }

  formattedResponse = formatEventFightsResponse(eventById);

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