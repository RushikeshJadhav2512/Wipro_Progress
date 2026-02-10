// TypeScript Function Examples

// Function with typed parameters and return type
function greet(name: string): string {
    return `Hello, ${name}!`;
}

console.log(greet("TypeScript"));

// Arrow function with types
const add = (a: number, b: number): number => {
    return a + b;
};

console.log(`5 + 3 = ${add(5, 3)}`);

// Optional parameters
function introduce(name: string, age?: number): string {
    if (age !== undefined) {
        return `Hello, ${name}! You are ${age} years old.`;
    }
    return `Hello, ${name}!`;
}

console.log(introduce("Alice", 25));
console.log(introduce("Bob"));

// Default parameters
function multiply(a: number, b: number = 2): number {
    return a * b;
}

console.log(`5 * 2 = ${multiply(5)}`);
console.log(`5 * 3 = ${multiply(5, 3)}`);

export {};

