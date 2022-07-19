import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { formatEventFights, formatEvents } from './helpers';
import AwaitAndRespond from './AwaitAndRespond';

const BOT_TOKEN = process.env.BOT_TOKEN || '';

const bot = new TelegramBot(BOT_TOKEN, { polling: true, onlyFirstMatch: true });

bot.onText(/^\/events$/gm, async (msg) => {
  const chatId = msg.chat.id;
  const responseHandler = new AwaitAndRespond(bot, chatId);
  // let events = [] as IEvents[];

  try {
    const events = await axios.get('https://mma-fights-scraper-api.herokuapp.com/api/events')
      .then(({ data }) => data);
    await bot.sendMessage(chatId, formatEvents(events));
  } catch (err) {
    await bot.sendMessage(chatId, 'Something went wrong, try again in a few minutes');
  }
  responseHandler.messageSent = true;
});

bot.onText(/^\/eventFights[0-9]$/gm, async (msg, match) => {
  const eventId = match && match[0].split('eventFights')[1];
  const chatId = msg.chat.id;
  const responseHandler = new AwaitAndRespond(bot, chatId);

  try {
    const event = (await axios.get(`https://mma-fights-scraper-api.herokuapp.com/api/event-card/${eventId}`).then(({ data }) => data)).fights;
    await bot.sendMessage(chatId, formatEventFights(event));
  } catch (err) {
    await bot.sendMessage(chatId, 'Something went wrong, try again in a few minutes');
  }
  responseHandler.messageSent = true;
});

bot.onText(/.+/gm, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Available commands: \n\n/events - Get list of upcoming events \n/eventFights(id) - Get list of fights by event(Ex: /eventFights1)');
});