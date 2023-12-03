import { Module } from '@nestjs/common';
import { BotService } from './services/bot.service';
import { CalculatorService } from './services/calculator.service';

@Module({
  providers: [BotService, CalculatorService],
})
export class BotModule {}
