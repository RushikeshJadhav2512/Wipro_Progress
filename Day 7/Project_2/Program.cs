using System;
using System.Linq;

namespace Day7_demo_1
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] arr = { 170, 45, 75, 90, 802, 24, 2, 66 };

            Console.WriteLine("Original Array:");
            PrintArray(arr);

            RadixSort(arr);

            Console.WriteLine("\nSorted Array:");
            PrintArray(arr);
        }

        // ---------------- COUNTING SORT (used by Radix Sort) ----------------
        static void CountingSortByDigit(int[] arr, int exp)
        {
            int n = arr.Length;
            int[] output = new int[n];
            int[] count = new int[10];

            // Step 1: Count occurrences of digits
            for (int i = 0; i < n; i++)
            {
                int digit = (arr[i] / exp) % 10;
                count[digit]++;
            }f

            // Step 2: Update count array
            for (int i = 1; i < 10; i++)
            {
                count[i] += count[i - 1];
            }

            // Step 3: Build output array (stable sort)
            for (int i = n - 1; i >= 0; i--)
            {
                int digit = (arr[i] / exp) % 10;
                output[count[digit] - 1] = arr[i];
                count[digit]--;
            }

            // Step 4: Copy output to original array
            for (int i = 0; i < n; i++)
            {
                arr[i] = output[i];
            }
        }

        // ---------------- RADIX SORT ----------------
        static void RadixSort(int[] arr)
        {
            int max = arr.Max();

            for (int exp = 1; max / exp > 0; exp *= 10)
            {
                CountingSortByDigit(arr, exp);
            }
        }

        // ---------------- HELPER METHOD ----------------
        static void PrintArray(int[] arr)
        {
            foreach (int num in arr)
            {
                Console.Write(num + " ");
            }
            Console.WriteLine();
        }
    }
}