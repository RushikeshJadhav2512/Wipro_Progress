"use strict";
// TypeScript OOP Concepts - Classes, Inheritance, Interfaces, Access Modifiers
Object.defineProperty(exports, "__esModule", { value: true });
// Access Modifiers:
// - public: accessible from anywhere (default)
// - private: accessible only within the class
// - protected: accessible within the class and its subclasses
// Example of a class with properties and methods
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    introduce() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
    // Getter method to access private-like data
    getName() {
        return this.name;
    }
}
const person1 = new Person("Alice", 30);
person1.introduce(); // Output: Hello, my name is Alice and I am 30 years old.
// Inheritance example
class Employee extends Person {
    constructor(name, age, employeeId) {
        super(name, age); // calling the parent class constructor
        this.employeeId = employeeId;
    }
    work() {
        console.log(`${this.name} is working with employee ID: ${this.employeeId}`);
        // Note: Can access 'name' because it's protected (not private)
    }
    getEmployeeId() {
        return this.employeeId;
    }
}
const employee1 = new Employee("Bob", 28, 101);
employee1.introduce(); // Output: Hello, my name is Bob and I am 28 years old.
employee1.work(); // Output: Bob is working with employee ID: 101
class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
    start() {
        console.log(`Starting the ${this.year} ${this.make} ${this.model}`);
    }
    stop() {
        console.log(`Stopping the ${this.year} ${this.make} ${this.model}`);
    }
}
const myCar = new Car("Toyota", "Camry", 2022);
myCar.start(); // Output: Starting the 2022 Toyota Camry
myCar.stop(); // Output: Stopping the 2022 Toyota Camry
function createUser(user) {
    console.log(`Creating user: ${user.name}, Age: ${user.age}`);
    if (user.email) {
        console.log(`Email: ${user.email}`);
    }
}
const user1 = { name: "John", age: 25 };
createUser(user1);
const user2 = { name: "Jane", email: "jane@example.com", age: 28 };
createUser(user2);
const point = { x: 10, y: 20 };
console.log(`Point: (${point.x}, ${point.y})`);
//# sourceMappingURL=oops.js.map