import { Injectable, Param } from '@nestjs/common';
import { ExpressionValidationPipe } from './expression.validation';
import ExprEval = require('expr-eval');

@Injectable()
export class CalculatorService {
  calculate(@Param('id', ExpressionValidationPipe) expression: string): number {
    const parser = ExprEval.Parser;
    return parser.parse(expression).evaluate(expression);
  }
}
