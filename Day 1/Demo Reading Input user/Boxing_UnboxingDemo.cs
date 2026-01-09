using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Day_1_DEmo2_ReadingInput_User
{
    internal class Boxing_UnboxingDemo
    {
        //Boxing is the process of converting a value type to an object type.
        //Unboxing is the process of converting an object type back to a value type.

        //Value type: Store value directly in memory (e.g., int, float, char). 
        //reference type: Store a reference (address) to the value in memory (e.g., string, arrays, class objects).

        //Ex Storing money in wallet compared to storing money in bank account.
        //in terms of access speed Value types are faster than reference types.
        //IN terms of space efficiency Value types are more space-efficient than reference types.
        //Value types are based on Stack memeory( fixed size) while reference types are based on Heap memory( unlimited).
        //Boxing and unboxing can introduce performance overhead due to additional memory allocation and type conversion.
        //ideally we should use less of boxing and unboxing in performance-critical applications.
        //In C# Object type is the base type from which all other types derive. ex all types are devied from object type.
        //types  in C# :
        //1. Value types: int, float, double, char, bool, struct, enum
        //2. Reference types: string, arrays, class, interface, delegate(function pointer)



        public static void Main1()
        {
            int num = 123; // Value type
            object obj = num; // Boxing beacause we are converting value type to object type
            Console.WriteLine("Value of obj after boxing: " + obj);
            int unboxedNum = (int)obj; // Unboxing here we have to specify the type to which we are converting
            Console.WriteLine("Value of unboxedNum after unboxing: " + unboxedNum);
        }

    }
}
