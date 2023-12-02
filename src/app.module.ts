import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BotService} from "./bot/bot.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BotService],
})
export class AppModule {}
