import { Injectable } from '@nestjs/common';
import ExprEval = require('expr-eval');

@Injectable()
export class CalculatorService {
  validate(expression: string): string {
    try {
      const parser = ExprEval.Parser;
      parser.parse(expression);
    } catch (error) {
      return 'Данное выражение не является математическим выражением';
    }

    return '';
  }

  calculate(expression: string): number {
    const parser = ExprEval.Parser;
    return parser.evaluate(expression);
  }
}
