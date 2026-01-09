// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
//This console application template can be used for diferent OS platforms.
//It is cross-platform and can run on Windows, Linux, and macOS.


//Steps for reading input from the user in a console application:
//Step 1: Use Console.ReadLine() to read a line of input from the user.
//Step 2: Store the input in a variable.
//Step 3: Process the input as needed (e.g., convert to a number, validate, etc.).
//Step 4: Use Console.WriteLine() to display output to the user.


//Console.WriteLine("Please enter your name:"); // Prompt the user for input
//string name = Console.ReadLine(); // Read user input and saving it to a variable of type string
//Console.WriteLine("Hello, " + name + "!"); // Display a greeting message using the input


//Example of reading a number from the user and performing a calculation ex If a user is eligible for vorting or not?
//Step 1: Prompt the user to enter their age.
//Step 2: Read the input and convert it to an integer.( by default Console.ReadLine() reads input as a string))
//Step 3: Check if the age is 18 or older to determine voting eligibility.
//Step 4: Display the result to the user.

Console.WriteLine("Please enter your age:"); // Prompt the user for input
string ageInput = Console.ReadLine(); // Read user input as a string
int age; // Variable to store the converted age
bool isValidAge = int.TryParse(ageInput, out age); // Try to convert the input to an integer
Console.WriteLine(""); // Blank line for better readability
if (isValidAge) // Check if the conversion was successful
{
    if (age >= 18) // Check voting eligibility
    {
        Console.WriteLine("You are eligible to vote.");
    }
    else
    {
        Console.WriteLine("You are not eligible to vote.");
    }
}
else
{
    Console.WriteLine("Invalid input. Please enter a valid age.");
}









