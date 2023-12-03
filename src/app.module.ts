import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot/services/bot.service';
import { CalculatorService } from './bot/services/calculator.service';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [BotModule],
  controllers: [AppController],
  providers: [AppService, BotService, CalculatorService],
})
export class AppModule {}
