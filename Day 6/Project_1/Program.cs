using System;
using System.Collections;

class Program
{
    static void Main(string[] args)
    {
        // Step 1: Create a non-generic Stack
        Stack stack = new Stack();

        // Step 2: Push values onto the stack
        stack.Push(10);
        stack.Push(20);
        stack.Push(30);
        stack.Push("Inception");

        // Step 3: Pop a value from the stack
        string poppedValue = (string)stack.Pop();
        Console.WriteLine("Popped Value: " + poppedValue);

        // Step 4: Peek top value without removing
        int topValue = (int)stack.Peek();
        Console.WriteLine("Top Value: " + topValue);

        // Step 5: Check if stack contains a value
        bool contains20 = stack.Contains(20);
        Console.WriteLine("Stack contains 20: " + contains20);
 
        // Step 6: Display count
        int count = stack.Count;
        Console.WriteLine("Current Count: " + count);

        

        // Step 7: Clear the stack
        stack.Clear();
        Console.WriteLine("Stack cleared.");
        Console.WriteLine("Current Count after clearing: " + stack.Count);
    }
}