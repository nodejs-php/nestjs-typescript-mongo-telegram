import { Injectable, OnModuleInit } from '@nestjs/common';
import { config } from 'dotenv';
import TelegramBot = require('node-telegram-bot-api');
import { CalculatorService } from './calculator/calculator.service';

config();

@Injectable()
export class BotService implements OnModuleInit {
  constructor(private calculatorService: CalculatorService) {}

  onModuleInit() {
    this.botMessage();
  }

  botMessage() {
    process.env.NTBA_FIX_319 = '1';
    console.log(process.env.TELEGRAM_TOKEN);
    const token = process.env.TELEGRAM_TOKEN;
    const bot: TelegramBot = new TelegramBot(token, { polling: true });

    bot.onText(/\/(start)|(help)/, (msg: TelegramBot.Message) => {
      const chatId = msg.chat.id;
      const help: string = `Команды:
      /echo [Что-нибудь] - для вывода текста в Telegram
      /help - для помощи
      /calculate [число][операция][число] - для вычисления значения выражения, например, /calculate 4*7
      `;
      bot.sendMessage(chatId, help);
    });

    bot.onText(
      /\/calculate (.+)/,
      (msg: TelegramBot.Message, match: RegExpMatchArray) => {
        const chatId = msg.chat.id;
        const expression = match[1];
        const result: string = this.calculatorService
          .calculate(expression)
          .toString();
        bot.sendMessage(chatId, 'Результат: ' + result);
      },
    );
  }
}
