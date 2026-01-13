using System;


enum OrderStatus { Pending, Processing, Shipped, Delivered, Cancelled }


struct DeliveryCoordinates
{
    public double Lat, Lng;
    public DeliveryCoordinates(double lat, double lng) { Lat = lat; Lng = lng; }
}

interface IPayment
{
    void ProcessPayment(double amount);
    void RefundPayment(double amount);
    bool MakePayment(double amount);
}


class Order
{
    public string Id, Customer;
    public decimal Total;
    public OrderStatus Status;
    public DeliveryCoordinates Location;
    public IPayment Payment;

    public Order(string id, string customer, decimal total)
    {
        Id = id; Customer = customer; Total = total;
        Status = OrderStatus.Pending;
    }

    public void UpdateStatus(OrderStatus s) { Status = s; }
    public void SetLocation(double lat, double lng) { Location = new DeliveryCoordinates(lat, lng); }
    public void ProcessPayment() { Payment?.ProcessPayment((double)Total); }
}


class CreditCard : IPayment
{
    public void ProcessPayment(double a) => Console.WriteLine($"CreditCard: Processing ${a}");
    public void RefundPayment(double a) => Console.WriteLine($"CreditCard: Refunding ${a}");
    public bool MakePayment(double a) { Console.WriteLine($"CreditCard: Paid ${a}"); return true; }
}

class PayPal : IPayment
{
    public void ProcessPayment(double a) => Console.WriteLine($"PayPal: Processing ${a}");
    public void RefundPayment(double a) => Console.WriteLine($"PayPal: Refunding ${a}");
    public bool MakePayment(double a) { Console.WriteLine($"PayPal: Paid ${a}"); return true; }
}

class Program
{
    static void Main()
    {
        Order order = new Order("ORD-001", "John", 299.99m);
        order.SetLocation(40.71, -74.00);
        order.Payment = new CreditCard();

        Console.WriteLine($"Order: {order.Id}, Customer: {order.Customer}, Status: {order.Status}");
        Console.WriteLine($"Location: ({order.Location.Lat}, {order.Location.Lng})");
        order.Payment.MakePayment((double)order.Total);
    }
}

