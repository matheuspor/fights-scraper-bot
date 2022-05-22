import express from 'express';
import 'dotenv/config';
import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const api = express();
api.disable('x-powered-by');
api.use(express.json());

const PORT = process.env.PORT || 3001;

const BOT_TOKEN = process.env.BOT_TOKEN || '';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/^\/fights$/gm, (msg) => {
  axios.get('https://mma-fights-scraper-api.herokuapp.com/api/fights')
    .then(({ data }) => {
      data.forEach((fight: typeof data) => {        
        const { title, date, time, fightNight } = fight;
        const dateObj = new Date(date);
        const chatId = msg.chat.id;
        const formattedResponse = `MainFight: ${title} | Date: ${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()} | Time: ${time} ${fightNight && 'FightNight'}`;
      
        bot.sendMessage(chatId, formattedResponse);        
        setTimeout(() => (''), 500);
      });
    });
});

bot.onText(/^((?!\/fights|\/fights-card).)*$/gm, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Use the commands /fights or /fightsCard');
});

api.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
});

export default api;