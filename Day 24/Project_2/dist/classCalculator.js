"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
// Calculator class with basic arithmetic operations
class Calculator {
    add(a, b) {
        return a + b;
    }
    sub(a, b) {
        return a - b;
    }
    mul(a, b) {
        return a * b;
    }
    div(a, b) {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    }
}
exports.Calculator = Calculator;
//# sourceMappingURL=classCalculator.js.map