using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ConsoleAppGeneric_Async_Order_Processing_System
{
  
       
        // ---------------- GENERIC CLASS ----------------
        class GenericOrderProcessor<T>
        {
            // Generic Field
            public T OrderData;

            public GenericOrderProcessor(T data)
            {
                OrderData = data;
            }

            // Generic Method
            public void Process()
            {
                Console.WriteLine($"Processing Order: {OrderData}");
            }
        }

        // ---------------- GENERIC METHOD ----------------
        class Utility
        {
            public static void Print<T>(T value)
            {
                Console.WriteLine($"Utility Output: {value}");
            }
        }

        // ---------------- REF & OUT ----------------
        class DiscountCalculator
        {
            public static void ApplyDiscount(ref double amount, out double discount)
            {
                discount = amount * 0.10;
                amount -= discount;
            }
        }

        // ---------------- THREADING ----------------
        class ThreadProcessor
        {
            public static void ProcessOrder(string orderId)
            {
                Console.WriteLine(
                    $"Thread {Thread.CurrentThread.ManagedThreadId} started processing Order {orderId}");
                Thread.Sleep(1000);
                Console.WriteLine($"Order {orderId} completed");
            }
        }

        // ---------------- ASYNC / AWAIT ----------------
        class AsyncService
        {
            public static async Task<string> GetOrderStatusAsync()
            {
                await Task.Delay(2000); // Simulate I/O
                return "Order Successfully Confirmed";
            }
        }

        // ---------------- MAIN PROGRAM ----------------
        class Program
        {
            static async Task Main(string[] args)
            {
                Console.WriteLine("=== GENERICS DEMO ===");

                // Generic Class usage
                GenericOrderProcessor<int> intOrder =
                    new GenericOrderProcessor<int>(101);
                GenericOrderProcessor<string> stringOrder =
                    new GenericOrderProcessor<string>("ORD-5001");

                intOrder.Process();
                stringOrder.Process();

                // Generic Method
                Utility.Print(999);
                Utility.Print("Generic Method Working");

                Console.WriteLine("\n=== REF & OUT DEMO ===");

                double amount = 2000;
                double discount;

                DiscountCalculator.ApplyDiscount(ref amount, out discount);
                Console.WriteLine($"Discount: {discount}");
                Console.WriteLine($"Final Amount: {amount}");

                Console.WriteLine("\n=== THREADING DEMO ===");

                Thread t1 = new Thread(() => ThreadProcessor.ProcessOrder("A101"));
                Thread t2 = new Thread(() => ThreadProcessor.ProcessOrder("B202"));

                t1.Start();
                t2.Start();

                t1.Join();
                t2.Join();

                Console.WriteLine("\n=== ASYNC / AWAIT DEMO ===");

                Console.WriteLine("Fetching order status...");
                string status = await AsyncService.GetOrderStatusAsync();
                Console.WriteLine(status);

                Console.WriteLine("\n=== APPLICATION COMPLETED ===");
            }
        }
    }




 
