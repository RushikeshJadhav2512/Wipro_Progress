using System;

class SortingCaseStudy
{
    static void Main(string[] args)
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

        foreach (int num in arr)
        {
            count[num]++;
        }

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
            CountingSortForRadix(arr, exp);
        }
    }

    static void CountingSortForRadix(int[] arr, int exp)
    {
        int n = arr.Length;
        int[] output = new int[n];
        int[] count = new int[10];

        for (int i = 0; i < n; i++)
            count[(arr[i] / exp) % 10]++;

        for (int i = 1; i < 10; i++)
            count[i] += count[i - 1];

        for (int i = n - 1; i >= 0; i--)
        {
            int index = (arr[i] / exp) % 10;
            output[count[index] - 1] = arr[i];
            count[index]--;
        }

        for (int i = 0; i < n; i++)
            arr[i] = output[i];
    }

    static int GetMax(int[] arr)
    {
        int max = arr[0];
        foreach (int num in arr)
            if (num > max)
                max = num;
        return max;
    }

    // ---------------- PRINT ARRAY ----------------
    static void PrintArray(int[] arr)
    {
        foreach (int num in arr)
            Console.Write(num + " ");
        Console.WriteLine();
    }
}