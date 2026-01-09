// See https://aka.ms/new-console-template for more information
using System.Text; // Importing the System.Text namespace to use StringBuilder
Console.WriteLine("Hello, World!");
//String : In C# string is a sequence of characters used to represent text. Strings are immutable,
//meaning once created, they cannot be changed. You can create strings using double quotes. ex constants

string greeting = "Hello, World!"; // String literal

// You can also create strings using the String class constructor
string name = new string(new char[] { 'J', 'o', 'h', 'n' });


//In C#, strings can be concatenated using the + operator or the String.Concat method.
//Stringbuffer : In C#, StringBuilder is a mutable sequence of characters used for creating and manipulating strings efficiently,
//especially when performing multiple modifications. It is part of the System.Text namespace.

// Example of using StringBuilder in real life scenario
//Imagine you are building a text editor application where users can type and edit large documents.


StringBuilder document = new StringBuilder(); 
//here we are using StringBuilder to create a mutable string for our document (that can be modified)
document.Append("This is the first line of the document Your name .\n");
document.Append("This is the second line of the document Your Email .\n");
document.Append("This is the third line of the document. Your Linknedin ID \n");
// Users can continue to append, insert, or modify text in the document efficiently
//Show the content of the document
Console.WriteLine(document.ToString());
Console.WriteLine(GC.GetTotalMemory(false)); // Outputs the total memory used by the application


//If we try above scenario using string literal it will create multiple string instances
//in memory which is inefficient ex
string doc = "";
doc += "Hi i am parth  .\n";
doc += "I am learning C# .\n";
doc += "I love coding .\n";
Console.WriteLine(doc);

// Checking memory usage for above string example
// Each time we use += operator a new string instance is created in memory 
// which can lead to high memory consumption and reduced performance for large documents.
// Outputs the length of the final string

//Doing memeory consumption of both examples
Console.WriteLine(GC.GetTotalMemory(false)); // Outputs the total memory used by the application


//crosschecking memory usage for StringBuilder example
Console.WriteLine(document.Capacity); // Outputs the capacity of the StringBuilder
Console.WriteLine(doc.Length);// Outputs the length of the final string
//In summary, use string for simple,
//immutable text data and StringBuilder for scenarios involving frequent modifications to strings.

