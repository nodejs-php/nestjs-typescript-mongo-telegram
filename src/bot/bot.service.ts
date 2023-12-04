import {Injectable, OnModuleInit} from '@nestjs/common';
import {config} from 'dotenv';
import TelegramBot = require('node-telegram-bot-api');
import {CalculatorService} from './calculator/calculator.service';
import {ExpressionService} from "./schemas/expression.service";
import {ExpressionDto} from "./schemas/expression.dto";

config();

@Injectable()
export class BotService implements OnModuleInit {
    constructor(private calculatorService: CalculatorService, private expressionService: ExpressionService) {
    }

    onModuleInit() {
        this.botMessage();
    }

    botMessage() {
        process.env.NTBA_FIX_319 = '1';
        console.log(process.env.TELEGRAM_TOKEN);
        const token = process.env.TELEGRAM_TOKEN;
        const bot: TelegramBot = new TelegramBot(token, {polling: true});

        bot.onText(/\/(start)|(help)/, (msg: TelegramBot.Message) => {
            const chatId = msg.chat.id;
            const help: string = `Команды:
      /echo [Что-нибудь] - для вывода текста в Telegram
      /help - для помощи
      /calculate [математическое выражение, с использованием ()/*^/-+] - для вычисления значения выражения, например, /calculate (4*7)+6^2 
      /expressions add [математическое выражение]
      `;
            bot.sendMessage(chatId, help);
        });

        bot.onText(
            /\/calculate (.+)/,
            (msg: TelegramBot.Message, match: RegExpMatchArray) => {
                const chatId: number = msg.chat.id;
                const expression: string = match[1];
                const msgError: string = this.calculatorService.validate(expression);

                if (msgError) {
                    bot.sendMessage(chatId, msgError);
                } else {
                    const result: string = this.calculatorService
                        .calculate(expression)
                        .toString();
                    bot.sendMessage(chatId, 'Результат: ' + result);
                }
            },
        );

        bot.onText(
            /\/expressions (.+)/,
            (msg: TelegramBot.Message, match: RegExpMatchArray) => {
                const chatId: number = msg.chat.id;
                const command: string = match[1].trimStart().toString().toLowerCase();

                if (command.indexOf('add') === 0) {
                    const expression: string = command.replace(/add/, '').trimStart().toString().toLowerCase()
                    const msgError: string = this.calculatorService.validate(expression);

                    if (msgError) {
                        bot.sendMessage(chatId, msgError);
                    } else {
                        const expressionDto: ExpressionDto = new ExpressionDto(expression);
                        this.expressionService.create(expressionDto);

                        bot.sendMessage(chatId, 'Выражение добавлено. ');
                    }
                }
            },
        );
    }
}
