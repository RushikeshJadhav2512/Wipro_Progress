using System;
using Bank_account_management system;

namespace BankAudit
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("===== BANK ACCOUNT CREATION SYSTEM =====");

            // Take input from user
            Console.Write("Enter Account Holder Name: ");
            string name = Console.ReadLine();

            Console.Write("Enter Account Number: ");
            long accNo = Convert.ToInt64(Console.ReadLine());

            Console.Write("Enter 4-digit PIN: ");
            int pin = Convert.ToInt32(Console.ReadLine());

            Console.Write("Enter Initial Balance: ");
            double balance = Convert.ToDouble(Console.ReadLine());

            Console.Write("Enter Branch Code: ");
            string branch = Console.ReadLine();

            Console.WriteLine("\nSelect Account Type:");
            Console.WriteLine("1. Savings Account");
            Console.WriteLine("2. Current Account");
            Console.Write("Choice: ");
            int choice = Convert.ToInt32(Console.ReadLine());

            BankAccount acc;

            if (choice == 1)
            {
                acc = new SavingsAccount(name, accNo, pin, balance, branch);
                Console.WriteLine("\nSavings Account Created Successfully!");
            }
            else if (choice == 2)
            {
                acc = new CurrentAccount(name, accNo, pin, balance, branch);
                Console.WriteLine("\nCurrent Account Created Successfully!");
            }
            else
            {
                Console.WriteLine("Invalid account type selected.");
                return;
            }

            Console.WriteLine("\n===== ACCOUNT DETAILS =====");
            acc.ShowBasicDetails();

            Console.WriteLine("\n===== TRANSACTION MENU =====");

            bool running = true;
            while (running)
            {
                Console.WriteLine("\n1. Deposit");
                Console.WriteLine("2. Withdraw");
                Console.WriteLine("3. Check Balance");
                Console.WriteLine("4. Apply Interest (Savings only)");
                Console.WriteLine("5. Lock Account");
                Console.WriteLine("6. Unlock Account");
                Console.WriteLine("7. Exit");
                Console.Write("Select option: ");

                int option = Convert.ToInt32(Console.ReadLine());

                switch (option)
                {
                    case 1:
                        Console.Write("Enter amount to deposit: ");
                        double dep = Convert.ToDouble(Console.ReadLine());
                        acc.Deposit(dep);
                        Console.WriteLine("Deposit successful.");
                        break;

                    case 2:
                        Console.Write("Enter amount to withdraw: ");
                        double wit = Convert.ToDouble(Console.ReadLine());
                        Console.Write("Enter PIN: ");
                        int wpin = Convert.ToInt32(Console.ReadLine());
                        bool success = acc.Withdraw(wit, wpin);
                        Console.WriteLine(success ? "Withdrawal successful." : "Withdrawal failed.");
                        break;

                    case 3:
                        Console.WriteLine("Current Balance: " + acc.GetBalance());
                        break;

                    case 4:
                        if (acc is SavingsAccount sa)
                        {
                            sa.ApplyInterest();
                            Console.WriteLine("Interest applied.");
                        }
                        else
                        {
                            Console.WriteLine("Interest not applicable for Current Account.");
                        }
                        break;

                    case 5:
                        acc.LockAccount();
                        Console.WriteLine("Account locked.");
                        break;

                    case 6:
                        Console.Write("Enter PIN to unlock: ");
                        int upin = Convert.ToInt32(Console.ReadLine());
                        acc.UnlockAccount(upin);
                        Console.WriteLine("Account unlock attempted.");
                        break;

                    case 7:
                        running = false;
                        Console.WriteLine("Exiting system...");
                        break;

                    default:
                        Console.WriteLine("Invalid option.");
                        break;
                }
            }

            Console.WriteLine("===== PROGRAM ENDED =====");
            Console.ReadLine();
        }
    }
}