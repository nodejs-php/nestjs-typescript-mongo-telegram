import { Get, Controller, Res, HttpStatus  } from '@nestjs/common';
import { AppService } from './app.service';
import {BotService} from "./bot/bot.service";

@Controller()
export class AppController {
  constructor(private botService: BotService) {}

  @Get()
  getBotDialog(@Res() res) {
    this.botService.botMessage();
    res.status(HttpStatus.OK).send('Bot service started');
  }
}
