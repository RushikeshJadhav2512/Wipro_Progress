using System;
using System.IO;

class FileHandlingDemo
{
    static void Main()
    {
        string filePath = "demo.txt";

        Console.WriteLine("=== File Handling Demo ===\n");

        // Check if file exists, if not create it
        if (!File.Exists(filePath))
        {
            File.Create(filePath).Close();
            Console.WriteLine("File created: " + filePath);
        }
        else
        {
            Console.WriteLine("File already exists: " + filePath);
        }

        // Write to file using StreamWriter
        using (StreamWriter writer = new StreamWriter(filePath))
        {
            writer.WriteLine("Hello, File Handling!");
            writer.WriteLine("This is a demo of file operations in C#.");
            writer.WriteLine("Date: " + DateTime.Now);
        }
        Console.WriteLine("Data written using StreamWriter");

        // Write using File.WriteAllText
        File.WriteAllText(filePath, "Overwritten with File.WriteAllText\n");
        Console.WriteLine("Data written using File.WriteAllText");

        // Read using StreamReader
        Console.WriteLine("\nReading file using StreamReader:");
        using (StreamReader reader = new StreamReader(filePath))
        {
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                Console.WriteLine(line);
            }
        }

        // Read all text
        Console.WriteLine("\nReading all text at once:");
        string content = File.ReadAllText(filePath);
        Console.WriteLine(content);

        // Delete file
        File.Delete(filePath);
        Console.WriteLine("\nFile deleted: " + filePath);

        if (!File.Exists(filePath))
        {
            Console.WriteLine("File confirmed deleted");
        }

        Console.WriteLine("\n=== Demo Complete ===");
    }
}