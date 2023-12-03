import { Get, Controller, Res, HttpStatus } from '@nestjs/common';
import { BotService } from './bot/services/bot.service';

@Controller()
export class AppController {
  constructor(private botService: BotService) {}

  @Get()
  getBotDialog(@Res() res) {
    this.botService.botMessage();
    res.status(HttpStatus.OK).send('Сервис бота запущен');
  }
}
