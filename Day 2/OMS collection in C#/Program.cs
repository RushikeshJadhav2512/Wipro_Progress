// See https://aka.ms/new-console-template for more information
using Day_2_Demo2_OMS_Colelctions_IN_C_Sharp;
using System.Collections;

Console.WriteLine("getting started with arrays and collection in C# ...!!!");

//here is the implemetation of None generic collection as per Order management sysytem
//Step 1: Create a class to represent an Order or any type of item we want to store in the collection
//Step 2: Create a class for the None generic collection
//Step 3: Implement methods to add, remove, and retrieve items from the collection
//Step 4: Test the collection with different types of items
//Step 5: Display the items in the collection using a loop


//here is a simple implementation of a None generic collection in C#

//Creating a non generic collection class array list to store different types of orders


Console.WriteLine("Non Generic Collection Implementation");
ArrayList orderCollection = new ArrayList();
orderCollection.Add("laptop");//adding string type item
Console.WriteLine("total no of elelemnt in the collection " + orderCollection.Count);
Console.WriteLine("Right now the memory of collection is "+orderCollection.Capacity);
orderCollection.Add(12345);//adding integer type item
orderCollection.Add(99.99);//adding double type item
Console.WriteLine("total no of elelemnt in the collection " + orderCollection.Count);
Console.WriteLine("Right now the memory of collection is " + orderCollection.Capacity);
orderCollection.Add(new DateTime(2024, 6, 1));//adding DateTime type item
orderCollection.Add(true);//adding boolean type item
Console.WriteLine("total no of elelemnt in the collection "+orderCollection.Count);
Console.WriteLine("Right now the memory of collection is " + orderCollection.Capacity);
orderCollection.Add('A');//adding char type item
Console.WriteLine("total no of elelemnt in the collection " + orderCollection.Count);

Console.WriteLine("Right now the memory of collection is " + orderCollection.Capacity);


//displaying the items in the collection

Console.WriteLine("Items in the Order Collection:");
foreach (var item in orderCollection)
{
    Console.WriteLine(item);
}

//Above collection is of non generic type as it can store different types of items as well as the size is also dynamic 
//i.e it can grow and shrink as per the requirement.

// For displaying the type of each item in the collection
Console.WriteLine("Items in the Order Collection with their types:");
foreach (var item in orderCollection)
{
    Console.WriteLine($"{item} - Type: {item.GetType()}");
}



//Above collection can be made generic by using List<T> instead of ArrayList
Console.WriteLine("Generic Collection Implementation");
List<string> genericOrderCollection = new List<string>();//only string type items can be stored in this collection
genericOrderCollection.Add("laptop");
genericOrderCollection.Add("mobile");
genericOrderCollection.Add("tablet");
genericOrderCollection.Add(12345.ToString());//This line will cause a compile-time error as we are trying to add an integer to a string collection

Console.WriteLine("total no of elelemnt in the generic collection " + genericOrderCollection.Count);
Console.WriteLine("Right now the memory of generic collection is " + genericOrderCollection.Capacity);
//displaying the items in the generic collection
Console.WriteLine("Items in the Generic Order Collection:");
foreach (var item in genericOrderCollection)
{
    Console.WriteLine(item);
}
//Above collection is of generic type as it can store only string type items as well as the size is also dynamic

//In case of order management sysytem it is better to use generic collection as it
//provides type safety and better performance.
//Step 1: Create a class to represent an Order


//Step 2: Create a generic collection to store Order objects


List<Order> orderList = new List<Order>();

//Adding some sample orders to the collection
orderList.Add(new Order { OrderId = 1, ProductName = "Laptop", Quantity = 2, Price = 1500.00 });
orderList.Add(new Order { OrderId = 2, ProductName = "Mobile", Quantity = 5, Price = 800.00 });

//displaying the orders in the collection
Console.WriteLine("Orders in the Order Collection:");
foreach (var order in orderList)
{
    Console.WriteLine(order);
}



