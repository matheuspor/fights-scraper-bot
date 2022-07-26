import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import { formatEventFights, formatEvents } from './helpers';
import AwaitAndRespondUser from './AwaitAndRespondUser';
import { IEvents, IFightCard } from './interfaces';

const BOT_TOKEN = process.env.BOT_TOKEN || '';

const bot = new TelegramBot(BOT_TOKEN, { polling: true, onlyFirstMatch: true });

bot.onText(/^\/events$/gm, async (msg) => {
  const apiUrl = 'https://mma-fights-scraper-api.herokuapp.com/api/events';
  const chatId = msg.chat.id;
  const responseHandler = new AwaitAndRespondUser<IEvents[]>(bot, chatId);
  await responseHandler.respondUser(formatEvents, apiUrl);
});

bot.onText(/^\/eventFights[0-9]$/gm, async (msg, match) => {
  const eventId = match && match[0].split('eventFights')[1];
  const apiUrl = `https://mma-fights-scraper-api.herokuapp.com/api/event-card/${eventId}`;
  const chatId = msg.chat.id;
  const responseHandler = new AwaitAndRespondUser<IFightCard>(bot, chatId);
  await responseHandler.respondUser(formatEventFights, apiUrl);
});

bot.onText(/.+/gm, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Available commands: \n\n/events - Get list of upcoming events \n/eventFights(id) - Get list of fights by event(Ex: /eventFights1)');
});