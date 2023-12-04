import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expression } from './expression.schema';
import { CreateExpressionDto } from './expression.dto';

@Injectable()
export class ExpressionService {
  constructor(@InjectModel('expression') private catModel: Model<Expression>) {}

  async create(createCatDto: CreateExpressionDto): Promise<Expression> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Expression[]> {
    return this.catModel.find().exec();
  }
}
