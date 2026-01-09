// See https://aka.ms/new-console-template for more information
using System.Runtime.Versioning;

Console.WriteLine("Hello, World!");

//Steps for creating Arrays in C#
//Step 1: Declare the array of type int 
//Step 2: Initialize the array with size 5
//Step 3: Assign values to each index of the array
//Step 4: Print the values of the array using a for loop

//int[] numbers = new int[5];
//numbers[0] = 10;
//numbers[1] = 20;
//numbers[2] = 30;
//numbers[3] = 40;
//numbers[4] = 50;
//Alternative way of declaring and initializing an array in C#

int[] numbers = { 10, 20, 30, 40, 50 }; //declaration and initialization of array

//ForLoop consiiste of (Initialization; Condition; Increment/Decrement)
//For loop is used for iterating over a sequence (like an array) a specific number of times
for (int i = 0; i < numbers.Length; i++) // here numbers.Length gives the size of the array
{
    Console.WriteLine("Element at index " + i + ": " + numbers[i]);
}


//performing builtin operations on arrays
//Array.Sort(numbers); // Sorts the array in ascending order
//Array.Reverse(numbers); // Reverses the order of elements in the array
//Array.IndexOf(numbers, 30); // Returns the index of the element 30 in the array
//Array.Length; // Returns the maximum length of the array

//In C# we have get,set methods to access and modify the elements of an array

//features of arrays in C#:
//1. Fixed Size: Once an array is created, its size cannot be changed.( Collections like List<T> can be used for dynamic sizing)
//2. Zero-Based Indexing: The first element of an array is accessed with index 0.
//3. Homogeneous Elements: All elements in an array must be of the same data type.if they are not , type casting is required. collection 
//4. Multi-Dimensional Arrays: C# supports multi-dimensional arrays (e.g., 2D arrays, 3D arrays).
//5. Array Methods: C# provides various built-in methods for arrays, such as Sort(), Reverse(), and IndexOf().
//6. Array Properties: Arrays have properties like Length, which returns the number of elements in the array.
//7. Array Initialization: Arrays can be initialized at the time of declaration using curly braces {}.


//When we should use arrays in C#?
//1. Fixed Size Requirement: When the number of elements is known and does not change frequently.
//2. Performance: Arrays provide fast access to elements using indices, making them suitable for performance-critical applications.
//3. Homogeneous Data: When all elements are of the same type, arrays provide a simple and efficient way to store and manipulate data.
//4. Multi-Dimensional Data: When dealing with grid-like data structures, such as matrices or tables.

//some common use cases of arrays in C#:
//1. Storing a list of items, such as product names or IDs.
//2. Implementing mathematical matrices for calculations.
//3. Managing collections of data, such as student grades or employee records.


//Getting started with 2D Arrays in C#
//Step 1: Declare a 2D array of type int syntax : dataType[,] arrayName = new dataType[rows, columns];
//Step 2: Initialize the 2D array with values

Console.WriteLine( " here is  a 2 D array in action ");
int[,] matrix = new int[3, 3] //3 rows and 3 columns
{
    {1, 2, 3}, //Row 0
    {4, 5, 6}, //Row 1
    {7, 8, 9}  //Row 2
};

//Step 3: Print the values of the 2D array using nested for loops
for (int i = 0; i < 3; i++) //Iterate through rows
{
    for (int j = 0; j < 3; j++) //Iterate through columns
    {
        Console.Write(matrix[i, j] + " "); //Print element at row i and column j
    }
    Console.WriteLine(); //New line after each row
}



//jagged Arrays in C# : where each element is an array itself ex
//Arrays  of arrays , specific rows can have different number of columns
//Biggest benefit : memory efficiency when dealing with non-uniform data ex
// a table where each row represents a different entity with varying attributes in case of e commerce products
//Step 1: Declare a jagged array
//Step 2: Initialize each row with different sizes
//Step 3: Print the values of the jagged array using nested for loops
//hence we use jagged arrays when we have non uniform data to save memory over a 2D array,
//where all rows must have same number of columns
Console.WriteLine(  "here is a Jagged array in action ...!!!s");
int[][] jaggedArray = new int[3][]; //Declare a jagged array with 3 rows
jaggedArray[0] = new int[] { 1, 2 }; //First row with 2 elements
jaggedArray[1] = new int[] { 3, 4, 5 }; //Second row with 3 elements
jaggedArray[2] = new int[] { 6, 7, 8, 9 }; //Third row with 4 elements
                                           //Print jagged array
   for (int i = 0; i < jaggedArray.Length; i++) //Iterate through rows
    {
         for (int j = 0; j < jaggedArray[i].Length; j++) //Iterate through columns of each row
         {
              Console.Write(jaggedArray[i][j] + " "); //Print element at row i and column j
         }
         Console.WriteLine(); //New line after each row
    }

// Showing memory efficiency of Jagged Arrays over 2D arrays
Console.WriteLine("Memory Efficiency Comparison:");
int totalElements2D = 3 * 3; // 2D array with 3 rows and 3 columns
int totalElementsJagged = 2 + 3 + 4; // Jagged array with rows of sizes 2, 3, and 4
for (int i = 0; i < totalElements2D; i++)
{
    Console.Write("*"); // Representing memory usage for 2D array
    Console.Write(totalElements2D > totalElementsJagged ? "" : ""); // Just for alignment
}
    
Console.WriteLine("  <- 2D Array Memory Usage"); // memeory comsumption representation
int bytesPerElement =  Buffer.ByteLength(new int[1]); // Get size of an int in bytes
Console.WriteLine(" total memory in bytes taken by 2 D array  "+bytesPerElement);

for (int i = 0; i < totalElementsJagged; i++)
{
    Console.Write("*"); // Representing memory usage for Jagged array
    Console.Write(totalElements2D > totalElementsJagged ? "" : ""); // Just for alignment
}
Console.WriteLine("  <- Jagged Array Memory Usage");

Console.WriteLine(" total memory in bytes taken by Jagged array  " + (bytesPerElement * totalElementsJagged));
//In this example, the jagged array uses less memory than the 2D array due to its non-uniform row sizes.


//Case study : Using Arrays to Manage Student Grades
//if i want to store marks of students in different subjects: "Subject wise marks for each student"
//Step 1: Declare a 2D array to store marks of 3 students in 4 subjects
//Step 2: Initialize the array with sample marks
//Step 3: Calculate and print the average marks for each student
//Step 4: Calculate and print the average marks for each subject
//Step 5: Find and print the highest and lowest marks in the class
// Syntax for declaraing  2D array as per above  sceanario is 
// dataType[,] arrayName = new dataType[rows, columns];

// ther is a differenec between storing marks and storing subject wise marks for each student
//In first case each row represents a student and each column represents a subject
//In second case each row represents a subject and each column represents a student


