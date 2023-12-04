import { Injectable } from '@nestjs/common';

@Injectable()
export class CalculatorService {
  calculate(expression: string): number {
    let result: number = 0;
    result = eval(expression);

    return result;
  }
}
