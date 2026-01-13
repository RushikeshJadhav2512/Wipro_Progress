using System;

namespace SimpleOnlineLearning
{
    class Course
    {
        public int CourseId { get; set; }
        public string CourseName { get; set; }
    }

    static class LearningPlatform
    {
        public static string PlatformName { get; set; }

        public static void Display()
        {
            Console.WriteLine("Platform: " + PlatformName);
        }
    }

    class Program
    {
        static void Main()
        {
            
            Course course1 = new Course();
            course1.CourseId = 1;
            course1.CourseName = "C# Fundamentals";

            Console.WriteLine("Course Id: " + course1.CourseId);
            Console.WriteLine("Course Name: " + course1.CourseName);

            Console.WriteLine();

           
            LearningPlatform.PlatformName = "Online Learning Platform";
            LearningPlatform.Display();
        }
    }
}