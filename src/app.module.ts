import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot/bot.service';
import { CalculatorService } from './bot/calculator/calculator.service';

@Module({
  controllers: [AppController],
  providers: [AppService, BotService, CalculatorService],
})
export class AppModule {}
