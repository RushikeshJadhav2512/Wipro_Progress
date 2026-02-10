// Below re some industry use cases where uion are declared and implmented in TypeScript
// 1. Handling Multiple Types in Function Parameters
// example: A function that accepts either a string or an array of strings and processes them accordingly.
function processInput(input: string | string[]) {
    if (typeof input === "string") {    
        console.log("Processing single string:", input);
    }
    else {
        console.log("Processing array of strings:", input.join(", "));
    }
}
processInput("Hello, World!");
processInput(["Hello", "World", "!"]);


// 2. API Response Handling
// example: An API response that can return either a success object or an error object.
interface SuccessResponse {
    status: "success";
    data: any;
}
interface ErrorResponse {
    status: "error";
    message: string;
}
type ApiResponse = SuccessResponse | ErrorResponse;
function handleApiResponse(response: ApiResponse) {
    if (response.status === "success") {    
        console.log("Data received:", response.data);
    }
    else {
        console.error("Error occurred:", response.message);
    }   
}
handleApiResponse({ status: "success", data: { id: 1, name: "Alice" } });
handleApiResponse({ status: "error", message: "Something went wrong!" });
// 3. Event Handling
// example: An event handler that can accept either a mouse event or a keyboard event.
function handleEvent(event: MouseEvent | KeyboardEvent) {
    if (event instanceof MouseEvent) {    
        console.log("Mouse event at coordinates:", event.clientX, event.clientY);
    }
    else {
        console.log("Keyboard event with key:", event.key);
    }
}
// Note: In a real application, you would typically attach this handler to actual events, but for demonstration purposes, we can create mock events.
const mockMouseEvent = new MouseEvent("click", { clientX: 100, clientY: 200 });
const mockKeyboardEvent = new KeyboardEvent("keydown", { key: "Enter" });
handleEvent(mockMouseEvent);
handleEvent(mockKeyboardEvent);
// 4. Form Input Handling
// example: A form input handler that can accept either a string (for text input) or a number (for numeric input).
function handleFormInput(input: string | number) {
    if (typeof input === "string") {    
        console.log("Handling text input:", input);
    }
    else {
        console.log("Handling numeric input:", input);
    }
}
handleFormInput("Hello, Form!");
handleFormInput(42);