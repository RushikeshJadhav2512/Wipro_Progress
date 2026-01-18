using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleAppOrder_Processing_Pipeline__Delegates_Events_
{
    namespace OrderProcessingFinal
    {
        // ---------------- ORDER MODEL ----------------
        class Order
        {
            public int OrderId { get; set; }
            public double Amount { get; set; }
            public bool IsPremiumCustomer { get; set; }
        }

        // ---------------- EVENT PUBLISHER ----------------
        class OrderService
        {
            // Event declaration
            public event Action<Order> OrderPlaced;

            public void PlaceOrder(Order order)
            {
                Console.WriteLine("\nOrderService: Placing order...");
                OrderPlaced?.Invoke(order);   // Raise event
            }
        }

        // ---------------- MAIN PROGRAM ----------------
        class Program
        {
            static void Main()
            {
                Console.WriteLine("=== ORDER PROCESSING STARTED ===");

                // STEP 1: Order Created
                Order order = new Order
                {
                    OrderId = 1001,
                    Amount = 15000,
                    IsPremiumCustomer = true
                };

                Console.WriteLine($"Order Created | ID: {order.OrderId}, Amount: {order.Amount}");

                // STEP 2: Anonymous Method (Validation)
                Func<Order, bool> validateOrder = delegate (Order o)
                {
                    return o.Amount > 0;
                };

                if (!validateOrder(order))
                {
                    Console.WriteLine("Order Validation Failed");
                    return;
                }
                Console.WriteLine("Order Validation Successful");

                // STEP 3: Func + Lambda (Calculate Discount)
                Func<Order, double> calculateDiscount = o =>
                    o.IsPremiumCustomer ? o.Amount * 0.10 : o.Amount * 0.05;

                double discount = calculateDiscount(order);
                order.Amount -= discount;

                Console.WriteLine($"Discount Applied: {discount}");
                Console.WriteLine($"Final Amount: {order.Amount}");

                // STEP 4: Predicate (High Value Order?)
                Predicate<Order> isHighValueOrder = o => o.Amount >= 10000;

                Console.WriteLine(
                    isHighValueOrder(order)
                    ? "High Value Order Identified"
                    : "Regular Order");

                // STEP 5: Action (Notification)
                Action<Order> notifyCustomer = o =>
                {
                    Console.WriteLine($"Notification Sent for Order ID: {o.OrderId}");
                };

                notifyCustomer(order);

                // STEP 6: Event Raised (OrderPlaced)
                OrderService service = new OrderService();

                // STEP 7: Subscribers Handle Event
                service.OrderPlaced += o =>
                {
                    Console.WriteLine($"Subscriber 1: Logging Order {o.OrderId}");
                };

                service.OrderPlaced += o =>
                {
                    Console.WriteLine($"Subscriber 2: Email sent for Order {o.OrderId}");
                };

                service.PlaceOrder(order);

                Console.WriteLine("\n=== ORDER PROCESSING COMPLETED ===");
            }
        }
    }

}
