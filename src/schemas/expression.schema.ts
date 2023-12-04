import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpressionDocument = HydratedDocument<Expression>;

@Schema()
export class Expression {
  @Prop()
  expression: string;

  @Prop()
  result: number;

  @Prop()
  error: string;
}

export const ExpressionSchema = SchemaFactory.createForClass(Expression);
