using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Day3_bankAccountManagementSysytemIN_CSharp; //Added reference to the core banking assembly

namespace BankAudit
//this is another assembly/project for 'BankAudit' to demonstrate internal access modifier.
{
    public  class CorporateAccount : Day3_bankAccountManagementSysytemIN_CSharp.BankAccount
    {
        public CorporateAccount(string accNumber, string pin, decimal interest, string branchCode)
            : base(accNumber, pin, interest, branchCode)
        {
            // Constructor calling base class constructor
            // Accessing protected internal member from base class
            //hence this will work as CorporateAccount is derived from BankAccount- Core banking assembly

        }

        public void ApplyCorporateInterest()// Method to apply interest for corporate account
        {
                balance += balance * interestRate / 100;
            }

        //pincode is private in base class hence not accessible here
        //branchCode is internal in base class hence not accessible here



    }
}