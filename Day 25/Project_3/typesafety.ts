// below ar some sceanrio of typp safety in typescript
// 1. Type Inference
let message = "Hello, TypeScript!"; // TypeScript infers the type as string
// message = 42; // Error: Type 'number' is not assignable to type 'string' 
// 2. Explicit Type Annotations
let count: number = 10; // Explicitly annotating the type as number
// count = "ten"; // Error: Type 'string' is not assignable to type 'number'
// 3. Function Parameter Types
function add(a: number, b: number): number {    
    return a + b;
}
// console.log(add(5, "10")); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
// 4. Interface and Type Aliases
interface User { 
    name: string;
    age: number;
}   
const user: User = {    
    name: "Alice",
    age: 30
};
// user.name = 123; // Error: Type 'number' is not assignable to type 'string'
// 5. Union Types
function printId(id: number | string) {
    console.log("ID:", id);
}
printId(123); // Valid
printId("abc"); // Valid
// printId(true); // Error: Argument of type 'boolean' is not assignable to parameter of type 'number | string'
// Union types allow a variable to hold more than one type, but it still enforces type safety by ensuring that only the specified types are used.