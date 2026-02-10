// TypeScript Basics and Features

// Basic Types
let message: string = "Hello, TypeScript!";
console.log(message);

let age: number = 30;
console.log(`I am ${age} years old.`);

let isActive: boolean = true;
if (isActive) {
    console.log("The user is active.");
} else {
    console.log("The user is not active.");
}

// Optional Parameters
function introduce(name: string, age?: number): string {
    if (age !== undefined) {
        return `Hello, ${name}! You are ${age} years old.`;
    }
    return `Hello, ${name}!`;
}

console.log(introduce("Alice", 25));
console.log(introduce("Bob"));

// Default Parameters
function multiply(a: number, b: number = 2): number {
    return a * b;
}

console.log(`5 * 2 = ${multiply(5)}`);
console.log(`5 * 3 = ${multiply(5, 3)}`);

export {};

