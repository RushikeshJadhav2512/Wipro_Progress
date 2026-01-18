using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DEmo_Sorting_techniques
{
    internal class Program
    {
        //As a data Processing engineer, i want to sort large dataset efficiently without using comparision-based algo, so that 
        //system performance remains high when handling numeric data.

        //        Student Marks:        78, 95, 45, 62, 78, 90, 45
        //        Registration Numbers: 102345, 984321, 345678, 123456, 567890

        //Step 1: Identify data contraints 
        //Marks -> integer between 0-100
        //Id -> 6 digit integer 

        //Step 2:  Choose Soerting algorithm
        //Marks -> Counting Sort
        //Id -> Radix Sort (LSD approach)
        //note: Algorithm choice deopends on Data Characterstics

        //Step 3: Implement the algorithm in C#



        static void Main()
        {
            // Student Marks (Counting Sort)
            int[] marks = { 78, 95, 45, 62, 78, 90, 45 };
            Console.WriteLine("Original Marks:");
            PrintArray(marks);

            CountingSort(marks, 100);

            Console.WriteLine("\nSorted Marks (Counting Sort):");
            PrintArray(marks);

            // Registration Numbers (Radix Sort)
            int[] regNumbers = { 102345, 984321, 345678, 123456, 567890 };
            Console.WriteLine("\nOriginal Registration Numbers:");
            PrintArray(regNumbers);

            RadixSort(regNumbers);

            Console.WriteLine("\nSorted Registration Numbers (Radix Sort):");
            PrintArray(regNumbers);
        }

        // ---------------- COUNTING SORT ----------------
        static void CountingSort(int[] arr, int maxValue)
        {
            int[] count = new int[maxValue + 1];

            // Step 1: Count occurrences
            foreach (int num in arr)
            {
                count[num]++;
            }

            // Step 2: Rebuild array
            int index = 0;
            for (int i = 0; i <= maxValue; i++)
            {
                while (count[i] > 0)
                {
                    arr[index++] = i;
                    count[i]--;
                }
            }
        }

        // ---------------- RADIX SORT ----------------
        static void RadixSort(int[] arr)
        {
            int max = GetMax(arr);

            for (int exp = 1; max / exp > 0; exp *= 10)
            {
                CountingSortByDigit(arr, exp);
            }
        }

        static int GetMax(int[] arr)
        {
            int max = arr[0];
            foreach (int num in arr)
            {
                if (num > max)
                    max = num;
            }
            return max;
        }

        static void CountingSortByDigit(int[] arr, int exp)
        {
            int n = arr.Length;
            int[] output = new int[n];
            int[] count = new int[10];

            // Count digit occurrences
            for (int i = 0; i < n; i++)
            {
                int digit = (arr[i] / exp) % 10;
                count[digit]++;
            }

            // Cumulative count
            for (int i = 1; i < 10; i++)
            {
                count[i] += count[i - 1];
            }

            // Build output array (stable)
            for (int i = n - 1; i >= 0; i--)
            {
                int digit = (arr[i] / exp) % 10;
                output[count[digit] - 1] = arr[i];
                count[digit]--;
            }

            // Copy back
            for (int i = 0; i < n; i++)
            {
                arr[i] = output[i];
            }
        }

        // Utility Method
        static void PrintArray(int[] arr)
        {
            foreach (int num in arr)
                Console.Write(num + " ");
            Console.WriteLine();
        }


    }
}
