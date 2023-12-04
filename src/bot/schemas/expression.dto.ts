export class ExpressionDto {
    constructor(expression: string) {
        this.expression = expression;
    }

    expression: string;
    result: number;
    error: string;
}
