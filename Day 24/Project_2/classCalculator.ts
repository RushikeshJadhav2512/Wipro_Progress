// Calculator class with basic arithmetic operations
export class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }
    sub(a: number, b: number): number {
        return a - b;
    }
    mul(a: number, b: number): number {
        return a * b;
    }
    div(a: number, b: number): number {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    }
}

