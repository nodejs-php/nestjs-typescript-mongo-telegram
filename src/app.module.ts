import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot/bot.service';
import { CalculatorService } from './bot/calculator/calculator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpressionSchema } from './bot/schemas/expression.schema';
import {ExpressionService} from "./bot/schemas/expression.service";

@Module({
  controllers: [AppController],
  providers: [AppService, BotService, CalculatorService, ExpressionService],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([
      { name: 'expression', schema: ExpressionSchema },
    ]),
  ],
})
export class AppModule {}
