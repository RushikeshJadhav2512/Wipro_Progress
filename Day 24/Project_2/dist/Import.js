"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classCalculator_1 = require("./classCalculator");
const calc = new classCalculator_1.Calculator();
console.log("Addition:", calc.add(10, 5));
console.log("Subtraction:", calc.sub(10, 5));
console.log("Multiplication:", calc.mul(10, 5));
console.log("Division:", calc.div(10, 5));
// Test division by zero error handling
try {
    console.log("Division by zero:", calc.div(10, 0));
}
catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    }
}
//# sourceMappingURL=Import.js.map