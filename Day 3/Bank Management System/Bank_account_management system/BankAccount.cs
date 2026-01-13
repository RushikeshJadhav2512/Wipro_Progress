using System;

namespace Day3_bankAccountManagementSysytemIN_CSharp
{
    public class BankAccount
    {
        private string accountPIN;
        public string accountNumber;
        protected internal decimal interestRate;
        internal string bankBranchCode;
        protected decimal balance;
        private bool isLocked;

        public BankAccount(string accNumber, string pin, decimal interest, string branchCode)
        {
            accountNumber = accNumber;
            accountPIN = pin;
            interestRate = interest;
            bankBranchCode = branchCode;
            isLocked = false;
        }

        public void Deposit(decimal amount)
        {
            if (isLocked) throw new InvalidOperationException("Account is locked.");
            balance += amount;
        }

        public bool Withdraw(decimal amount, int pin)
        {
            if (isLocked) throw new InvalidOperationException("Account is locked.");
            if (pin.ToString() == accountPIN && amount <= balance)
            {
                balance -= amount;
                return true;
            }
            return false;
        }

        public decimal GetBalance()
        {
            return balance;
        }

        public void LockAccount()
        {
            isLocked = true;
        }

        public void UnlockAccount(int pin)
        {
            if (pin.ToString() == accountPIN)
            {
                isLocked = false;
            }
            else
            {
                throw new InvalidOperationException("Unlock failed, incorrect PIN.");
            }
        }

        public void ShowBasicDetails()
        {
            Console.WriteLine($"Account Number: {accountNumber}, Balance: {GetBalance()}, Branch Code: {bankBranchCode}");
        }
    }
}
