import {
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';
import ExprEval = require('expr-eval');

export class ExpressionValidationPipe implements PipeTransform {
  constructor(private expression: string) {}

  transform(value: any) {
    try {
      const parser = ExprEval.Parser;
      parser.parse(value);
    } catch (error) {
      throw new BadRequestException(
        'Данное выражение не является математическим выражением',
      );
    }
    return value;
  }
}
