import {Model, Query, Schema} from 'mongoose';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Expression} from './expression.schema';
import {ExpressionDto} from './expression.dto';

@Injectable()
export class ExpressionService {
    constructor(@InjectModel('expression') private expressionModel: Model<Expression>) {
    }

    async create(createExpressionDto: ExpressionDto): Promise<Expression> {
        const createdCat = new this.expressionModel(createExpressionDto);
        return createdCat.save();
    }

    async clear() {
        return this.expressionModel.deleteMany({});
    }

    async findAll(): Promise<Expression[]> {
        return this.expressionModel.find().exec();
    }
}
