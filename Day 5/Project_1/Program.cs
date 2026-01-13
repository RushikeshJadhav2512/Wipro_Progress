using System;

// Custom Exception Class
[Serializable]
public class DailyLimitExceededException : Exception
{
    public DailyLimitExceededException() : base("Daily transaction limit exceeded.") { }
    public DailyLimitExceededException(string message) : base(message) { }
    public DailyLimitExceededException(string message, Exception inner) : base(message, inner) { }
}

// Business Logic Class (BankAccount)
class BankAccount
{
    private decimal dailyLimit = 1000;
    private decimal totalTransactionsToday = 0;

    public void MakeTransaction(decimal amount)
    {
        if (totalTransactionsToday + amount > dailyLimit)
        {
            throw new DailyLimitExceededException("Daily transaction limit exceeded.");
        }

        totalTransactionsToday += amount;
        Console.WriteLine($"Transaction of {amount} completed successfully.");
    }
}

class Program
{
    static void Main()
    {
        BankAccount account = new BankAccount();

        try
        {
            account.MakeTransaction(600);
            account.MakeTransaction(500); // exceeds limit
        }
        catch (DailyLimitExceededException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}

