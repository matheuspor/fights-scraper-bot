import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

export default class AwaitAndRespondUser<Type> {
  public messageSent: boolean;

  private bot: TelegramBot;

  private chatId: number;

  constructor(
    bot: TelegramBot,
    chatId: number,
  ) {
    this.bot = bot;
    this.chatId = chatId;
    this.messageSent = false;
    this.awaitApi(bot, chatId);
  }

  private awaitApi(bot: TelegramBot, chatId: number) {
    setTimeout(() => {
      if (!this.messageSent) {
        bot.sendMessage(chatId, 'A few more seconds...');
      }
    }, 5000);
  }

  public async respondUser(
    formatFunction: (data: Type) => string,
    apiUrl: string,
  ) {
    try {
      await axios.get(apiUrl)
        .then(({ data }) => this.bot.sendMessage(this.chatId, formatFunction(data)));
    } catch (err) {
      await this.bot.sendMessage(this.chatId, 'Something went wrong, try again in a few minutes');
    }
    this.messageSent = true;
  }
}