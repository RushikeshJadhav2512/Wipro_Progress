"use strict";
// TypeScript Function Examples
Object.defineProperty(exports, "__esModule", { value: true });
// Function with typed parameters and return type
function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("TypeScript"));
// Arrow function with types
const add = (a, b) => {
    return a + b;
};
console.log(`5 + 3 = ${add(5, 3)}`);
// Optional parameters
function introduce(name, age) {
    if (age !== undefined) {
        return `Hello, ${name}! You are ${age} years old.`;
    }
    return `Hello, ${name}!`;
}
console.log(introduce("Alice", 25));
console.log(introduce("Bob"));
// Default parameters
function multiply(a, b = 2) {
    return a * b;
}
console.log(`5 * 2 = ${multiply(5)}`);
console.log(`5 * 3 = ${multiply(5, 3)}`);
//# sourceMappingURL=typedFunction.js.map