import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { IEvents, IFightCard } from './interfaces';
import { formatEventFights, formatEvents } from './helpers';

const BOT_TOKEN = process.env.BOT_TOKEN || '';

const bot = new TelegramBot(BOT_TOKEN, { polling: true, onlyFirstMatch: true });

bot.onText(/^\/events$/gm, async (msg) => {
  const chatId = msg.chat.id;
  let messageSent = false;
  setTimeout(() => {
    if (!messageSent) {
      bot.sendMessage(chatId, 'Wait a few more seconds...');
    }
  }, 8000);
  let events = [] as IEvents[];
  let formattedResponse = 'Next Events: \n';

  try {
    events = await axios.get('https://mma-fights-scraper-api.herokuapp.com/api/events')
      .then(({ data }) => data);
  } catch (err) {
    bot.sendMessage(chatId, 'Something went wrong, try again in a few minutes');
    messageSent = true;
  }

  formattedResponse += formatEvents(events);

  bot.sendMessage(chatId, formattedResponse);
  messageSent = true;
});

bot.onText(/^\/eventFights[0-9]$/gm, async (msg, match) => {
  const eventId = match && match[0].split('eventFights')[1];
  const chatId = msg.chat.id;
  let messageSent = false;
  setTimeout(() => {
    if (!messageSent) {
      bot.sendMessage(chatId, 'Wait a few more seconds...');
    }
  }, 8000);
  let formattedResponse = '';
  let eventById = [] as IFightCard[];

  try {
    eventById = (await axios.get(`https://mma-fights-scraper-api.herokuapp.com/api/event-card/${eventId}`).then(({ data }) => data)).fights;
  } catch (err) {
    bot.sendMessage(chatId, 'Something went wrong, try again in a few minutes');
    messageSent = true;
  }

  formattedResponse = formatEventFights(eventById);

  bot.sendMessage(chatId, formattedResponse);
  messageSent = true;
});

bot.onText(/.+/gm, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Available commands: \n\n/events - Get list of upcoming events \n/eventFights(id) - Get list of fights by event(Ex: /eventFights1)');
});