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