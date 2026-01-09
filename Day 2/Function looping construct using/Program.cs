// See https://aka.ms/new-console-template for more information

using Day2_Functions_Looping_constructs;

mainFunction();// calling main function so that program runs and it calls other functions
//creating instance of class CarParking so that program runs
 CarParking delhiparking = new CarParking();
delhiparking.Run(); // calling Run method to start the parking application rest of the code is in CarParking.cs
// which will be executed auomatically



Console.WriteLine("Implementing fucntions ");

int calculateTotal(int marks1, int marks2, int marks3)
{
    return marks2 + marks1 + marks3;
}

//fucntion to calcuate average
double calculateAverage(int totalMarks, int numberOfSubjects = 3) // default parameter
{
    return (double)totalMarks / numberOfSubjects;
}
//fucntion to check result 
string checkResult(double averageMarks, double passMark = 40.0) // default parameter
{
    if (averageMarks >= passMark)
    {
        return "Pass";
    }
    else
    {
        return "Fail";
    }
}


//creating main function to call other functions
void mainFunction()
{
    int marks1 = 5;
    int marks2 = 8;
    int marks3 = 92;
    int totalMarks = calculateTotal(marks1, marks2, marks3);// function call
    double averageMarks = calculateAverage(totalMarks);
    string result = checkResult(averageMarks);

    Console.WriteLine("below is the result ...!!");
    Console.WriteLine($"Total Marks: {totalMarks}");
    Console.WriteLine($"Average Marks: {averageMarks}");
    Console.WriteLine($"Result: {result}");
}

