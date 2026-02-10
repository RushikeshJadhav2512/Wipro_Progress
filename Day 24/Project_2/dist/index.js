"use strict";
// TypeScript Basics and Features
Object.defineProperty(exports, "__esModule", { value: true });
// Basic Types
let message = "Hello, TypeScript!";
console.log(message);
let age = 30;
console.log(`I am ${age} years old.`);
let isActive = true;
if (isActive) {
    console.log("The user is active.");
}
else {
    console.log("The user is not active.");
}
// Optional Parameters
function introduce(name, age) {
    if (age !== undefined) {
        return `Hello, ${name}! You are ${age} years old.`;
    }
    return `Hello, ${name}!`;
}
console.log(introduce("Alice", 25));
console.log(introduce("Bob"));
// Default Parameters
function multiply(a, b = 2) {
    return a * b;
}
console.log(`5 * 2 = ${multiply(5)}`);
console.log(`5 * 3 = ${multiply(5, 3)}`);
//# sourceMappingURL=index.js.map