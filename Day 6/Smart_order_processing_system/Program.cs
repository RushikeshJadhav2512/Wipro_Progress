using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartOrderprocessingSystem_CSharp7_features
{
        class Program
        {
            static void Main(string[] args)
            {
                Console.WriteLine("=== Smart Order Processing System ===\n");

                // Expression-bodied constructor & members
                Order order = new Order(101, 1200);

                // Extension Method
                double discountedAmount = order.Amount.ApplyDiscount();

                // Tuples & Deconstruction
                var (currency, total, tax) = PricingService.CalculatePrice(discountedAmount);

                Console.WriteLine($"Order Summary:");
                Console.WriteLine($"Currency: {currency}");
                Console.WriteLine($"Total Amount: {total}");
                Console.WriteLine($"Tax: {tax}\n");

                // Pattern Matching
                ProcessOrderStatus(order.Status);

                // Out Variables
                if (OrderService.TryProcessOrder(order.Quantity, out var message))
                    Console.WriteLine(message);

                // Discards
                var (_, payableAmount, _) = PricingService.CalculatePrice(500);
                Console.WriteLine($"Payable Amount (Discard Demo): {payableAmount}\n");

                // Ref Locals & Returns
                Inventory inventory = new Inventory();
                ref int stock = ref inventory.GetStock(1);
                stock -= order.Quantity;

                Console.WriteLine($"Updated Stock for Item 1: {stock}\n");

                // Local Functions
                ValidateStock(stock);

                Console.WriteLine("\nPress any key to exit...");
                Console.ReadKey();
            }

            // Pattern Matching Demo
            static void ProcessOrderStatus(object status)
            {
                switch (status)
                {
                    case int s when s == 1:
                        Console.WriteLine("Order Status: Placed");
                        break;

                    case string s:
                        Console.WriteLine($"Order Status: {s}");
                        break;

                    default:
                        Console.WriteLine("Order Status: Unknown");
                        break;
                }
            }

            // Local Function Demo
            static void ValidateStock(int availableStock)
            {
                bool IsAvailable(int qty) => qty > 0;

                Console.WriteLine(
                    IsAvailable(availableStock)
                    ? "Stock is available"
                    : "Stock is out");
            }
        }

        // Expression-bodied Members
        class Order
        {
            public int Id { get; }
            public int Quantity { get; } = 2;
            public double Amount { get; }
            public object Status { get; } = 1;

            public Order(int id, double amount) => (Id, Amount) = (id, amount);

            public string GetSummary() => $"Order Id: {Id}, Amount: {Amount}";
        }

        // Extension Method
        static class OrderExtensions
        {
            public static double ApplyDiscount(this double amount)
                => amount > 1000 ? amount * 0.9 : amount;
        }

        // Tuples, Discards
        static class PricingService
        {
            public static (string currency, double total, double tax) CalculatePrice(double amount)
            {
                double tax = amount * 0.18;
                return ("INR", amount + tax, tax);
            }
        }

        // Out Variables
        static class OrderService
        {
            public static bool TryProcessOrder(int quantity, out string message)
            {
                if (quantity > 0)
                {
                    message = "Order processed successfully";
                    return true;
                }

                message = "Invalid order quantity";
                return false;
            }
        }

        // Ref Locals & Returns
        class Inventory
        {
            private int[] stock = { 10, 20, 30 };

            public ref int GetStock(int index)
            {
                return ref stock[index];
            }
        }
    }


