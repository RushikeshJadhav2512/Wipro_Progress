// TypeScript OOP Concepts - Classes, Inheritance, Interfaces, Access Modifiers

// Access Modifiers:
// - public: accessible from anywhere (default)
// - private: accessible only within the class
// - protected: accessible within the class and its subclasses

// Example of a class with properties and methods
class Person {
    // Using protected so subclasses can access these properties
    protected name: string;
    protected age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    public introduce(): void {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }

    // Getter method to access private-like data
    public getName(): string {
        return this.name;
    }
}

const person1 = new Person("Alice", 30);
person1.introduce(); // Output: Hello, my name is Alice and I am 30 years old.

// Inheritance example
class Employee extends Person {
    private employeeId: number;

    constructor(name: string, age: number, employeeId: number) {
        super(name, age); // calling the parent class constructor
        this.employeeId = employeeId;
    }

    public work(): void {
        console.log(`${this.name} is working with employee ID: ${this.employeeId}`);
        // Note: Can access 'name' because it's protected (not private)
    }

    public getEmployeeId(): number {
        return this.employeeId;
    }
}

const employee1 = new Employee("Bob", 28, 101);
employee1.introduce(); // Output: Hello, my name is Bob and I am 28 years old.
employee1.work(); // Output: Bob is working with employee ID: 101

// Interface example
interface Vehicle {
    make: string;
    model: string;
    year: number;
    start(): void;
    stop(): void;
}

class Car implements Vehicle {
    make: string;
    model: string;
    year: number;

    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    start(): void {
        console.log(`Starting the ${this.year} ${this.make} ${this.model}`);
    }

    stop(): void {
        console.log(`Stopping the ${this.year} ${this.make} ${this.model}`);
    }
}

const myCar = new Car("Toyota", "Camry", 2022);
myCar.start(); // Output: Starting the 2022 Toyota Camry
myCar.stop(); // Output: Stopping the 2022 Toyota Camry

// Interface with optional properties
interface User {
    name: string;
    email?: string;
    age: number;
}

function createUser(user: User): void {
    console.log(`Creating user: ${user.name}, Age: ${user.age}`);
    if (user.email) {
        console.log(`Email: ${user.email}`);
    }
}

const user1: User = { name: "John", age: 25 };
createUser(user1);

const user2: User = { name: "Jane", email: "jane@example.com", age: 28 };
createUser(user2);

// Readonly properties in interfaces
interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };
console.log(`Point: (${point.x}, ${point.y})`);
// point.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

export {};

