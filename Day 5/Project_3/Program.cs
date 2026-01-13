//creating a file using File.Create() method in default directory
using System;
using System.IO;


string filePath = "demo.txt";
using (FileStream fs = File.Create(filePath))
{
    
    if (File.Exists(filePath))
    {
        Console.WriteLine("File created successfully: " + filePath);
    }
}


using (StreamWriter sw = new StreamWriter(filePath))
{
    sw.WriteLine("Hello, this is a demo file created today.");
    sw.WriteLine("This file is created to demonstrate file handling in C#.");
}