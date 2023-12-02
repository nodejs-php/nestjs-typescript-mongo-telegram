import { Injectable, OnModuleInit } from '@nestjs/common';
import { config } from 'dotenv';
config();
@Injectable()
export class BotService implements OnModuleInit {
  onModuleInit() {
    this.botMessage();
  }
  botMessage() {
    process.env.NTBA_FIX_319 = '1';
    const TelegramBot = require('node-telegram-bot-api');
    console.log(process.env.TELEGRAM_TOKEN);
    const token = process.env.TELEGRAM_TOKEN;

    const bot = new TelegramBot(token, { polling: true });

    bot.on('message', (msg) => {
      let Hi = 'Привет';
      let whatToDo = 'Что я могу сделать?';
      console.log(msg.text.toString());
      if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot.sendMessage(
          msg.from.id,
          'Привет ' +
            msg.from.first_name +
            ' Что ты хочешь узнать обо мне ?',
        );
      } else if (msg.text.toString().toLowerCase().indexOf(whatToDo) === 0) {
        bot.sendMessage(
          msg.from.id,
          `Я могу тебе рассказать о моей базе данных. ${msg.from.first_name}`,
        );
      }
    });
  }
}
