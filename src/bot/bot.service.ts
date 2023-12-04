import { Injectable, OnModuleInit } from '@nestjs/common';
import { config } from 'dotenv';
import TelegramBot = require('node-telegram-bot-api');

config();

@Injectable()
export class BotService implements OnModuleInit {
  onModuleInit() {
    this.botMessage();
  }

  botMessage() {
    process.env.NTBA_FIX_319 = '1';
    console.log(process.env.TELEGRAM_TOKEN);
    const token = process.env.TELEGRAM_TOKEN;
    const bot: TelegramBot = new TelegramBot(token, { polling: true });

    bot.on('message', (msg: TelegramBot.Message) => {
      const Hi = 'Привет! Я очень рад тебя видеть!';
      const whatToDo = 'Что я могу сделать?';
      console.log(msg.text.toString());

      if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
        bot
          .sendMessage(
            msg.from.id,
            'Привет ' + msg.from.first_name + ' Что ты хочешь узнать обо мне ?',
          )
          .then((r: TelegramBot.Message) => console.log(r));
      } else if (msg.text.toString().toLowerCase().indexOf(whatToDo) === 0) {
        bot
          .sendMessage(
            msg.from.id,
            `Я могу тебе рассказать о моей базе данных. ${msg.from.first_name}`,
          )
          .then((r: TelegramBot.Message) => console.log(r));
      }
    });
  }
}
