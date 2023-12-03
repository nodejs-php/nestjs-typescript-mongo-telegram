import { Injectable } from '@nestjs/common';
import { Calculator } from '../calculator.dto';

@Injectable()
export class CalculatorService {
  private readonly calculator: Calculator;

  calculate(calculator: Calculator): number {
    let result: number = 0;
    switch (calculator.operator) {
      case '+':
        result = calculator.num1 + calculator.num2;
        break;
      case '*':
        result = calculator.num1 * calculator.num2;
        break;
      case '-':
        result = calculator.num1 - calculator.num2;
        break;
      case '/':
        result = calculator.num1 / calculator.num2;
        break;
    }

    return result;
  }
}
