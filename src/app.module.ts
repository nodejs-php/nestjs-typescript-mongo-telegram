import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotService } from './bot/bot.service';
import { CalculatorService } from './bot/calculator/calculator.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExpressionSchema } from './schemas/expression.schema';

@Module({
  controllers: [AppController],
  providers: [AppService, BotService, CalculatorService],
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MongooseModule.forFeature([
      { name: 'expression', schema: ExpressionSchema },
    ]),
  ],
})
export class AppModule {}
