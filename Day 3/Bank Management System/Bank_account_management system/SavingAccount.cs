using System;

namespace Day3_bankAccountManagementSysytemIN_CSharp
{
    public class SavingsAccount : BankAccount
    {
        public SavingsAccount(string accNumber, string pin, decimal interest, string branchCode)
            : base(accNumber, pin, interest, branchCode)
        {
        }

        public void ApplyInterest()
        {
            decimal interestAmount = balance * interestRate / 100;
            Deposit(interestAmount); // Adding interest to balance
        }
    }
}