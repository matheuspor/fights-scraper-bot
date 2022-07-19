import TelegramBot from 'node-telegram-bot-api';

export default class AwaitAndRespond {
  public messageSent: boolean;

  constructor(
    bot: TelegramBot,
    chatId: number,
  ) {
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
}