using System;
using System.Collections.Generic;
using System.Linq;

namespace Demo_Collection_Stack_Queue
{
    class Program
    {
        static void Main(string[] args)
        {
            // ---------------- STACK DEMO ----------------
            Stack<int> stack = new Stack<int>();

            stack.Push(10);
            stack.Push(20);
            stack.Push(30);

            Console.WriteLine("Popped Value: " + stack.Pop());
            Console.WriteLine("Top Value: " + stack.Peek());
            Console.WriteLine("Stack contains 20: " + stack.Contains(20));
            Console.WriteLine("Current Count: " + stack.Count);

            stack.Clear();
            Console.WriteLine("Stack cleared. Current Count after clearing: " + stack.Count);

            Console.WriteLine();

            // ---------------- LIST + LAMBDA + LINQ ----------------
            List<int> numbers = new List<int> { 3, 5, 81, 45, 32, 15, 70 };

            Console.WriteLine("List elements:");
            foreach (int number in numbers)
            {
                Console.WriteLine(number);
            }

            // Lambda expression – find first number > 10
            int result = numbers.Find(n => n > 10);
            Console.WriteLine("\nFirst number greater than 10: " + result);

            // LINQ + Lambda – find even numbers
            var evenNumbers = numbers.Where(n => n % 2 == 0);

            Console.WriteLine("\nHere are the list of even numbers:");
            foreach (var item in evenNumbers)
            {
                Console.WriteLine(item);
            }

            Console.WriteLine();

            // ---------------- QUEUE DEMO ----------------
            Queue<string> queue = new Queue<string>();

            queue.Enqueue("Inceptio");
            queue.Enqueue("Prestige");
            queue.Enqueue("Dark Knight");

            Console.WriteLine("Queue processing:");
            while (queue.Count > 0)
            {
                Console.WriteLine(queue.Dequeue());
            }
        }
    }
}