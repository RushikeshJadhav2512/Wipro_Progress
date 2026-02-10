import { Calculator } from "./classCalculator";

const calc = new Calculator();

console.log("Addition:", calc.add(10, 5));
console.log("Subtraction:", calc.sub(10, 5));
console.log("Multiplication:", calc.mul(10, 5));
console.log("Division:", calc.div(10, 5));

// Test division by zero error handling
try {
    console.log("Division by zero:", calc.div(10, 0));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error(error.message);
    }
}

