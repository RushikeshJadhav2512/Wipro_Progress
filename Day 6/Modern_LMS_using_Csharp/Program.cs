
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Modern_LMS_using_C_Sharp_8._0_Features
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("=== Modern LMS (C# 8.0 Features Demo) ===\n");

            // Nullable Reference Types
            Learner learner = new Learner
            {
                Name = "Aarav",
                Email = null
            };

            Console.WriteLine($"Learner Name: {learner.Name}");
            Console.WriteLine($"Learner Email: {learner.Email ?? "Not Provided"}\n");

            // Switch Expressions
            Console.WriteLine($"Course Level: {CourseEvaluator.GetLevel(7)}\n");

            // Async Streams
            Console.WriteLine("Streaming Learners:");
            await foreach (var l in LearnerService.GetLearnersAsync())
            {
                Console.WriteLine($"- {l.Name}");
            }
            Console.WriteLine();

            // Ranges and Indices
            string[] courses = { "C#", "Azure", "AI", "ML", "Data Engineering" };
            var recentCourses = courses[^2..];

            Console.WriteLine("Recent Courses:");
            foreach (var course in recentCourses)
                Console.WriteLine(course);
            Console.WriteLine();

            // Default Interface Methods
            ICourseService service = new CourseService();
            service.Enroll();
            service.Notify();
            Console.WriteLine();

            // Pattern Matching Enhancements
            Console.WriteLine($"Validation Result: {Validator.ValidateInput(10)}\n");

            // Using Declarations
            using var writer = new StreamWriter("log.txt");
            writer.WriteLine("Application executed successfully.");
            Console.WriteLine("Log file written.\n");

            // Readonly Members
            Certificate cert = new Certificate(101, "Azure AI Fundamentals");
            Console.WriteLine($"Certificate: {cert.Id} - {cert.Title}\n");

            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }

    // Nullable Reference Types
    class Learner
    {
        public string Name { get; set; } = string.Empty;
        public string? Email { get; set; }
    }

    // Async Streams
    static class LearnerService
    {
        public static async IAsyncEnumerable<Learner> GetLearnersAsync()
        {
            for (int i = 1; i <= 3; i++)
            {
                await Task.Delay(500);
                yield return new Learner { Name = $"Learner {i}" };
            }
        }
    }

    // Switch Expressions
    static class CourseEvaluator
    {
        public static string GetLevel(int rating) => rating switch
        {
            >= 8 => "Advanced",
            >= 5 => "Intermediate",
            _ => "Beginner"
        };
    }

    // Default Interface Methods
    interface ICourseService
    {
        void Enroll();
        void Notify() => Console.WriteLine("Default enrollment notification sent.");
    }

    class CourseService : ICourseService
    {
        public void Enroll()
        {
            Console.WriteLine("Learner enrolled successfully.");
        }
    }

    // Pattern Matching Enhancements
    static class Validator
    {
        public static bool ValidateInput(object input)
            => input is int value && value > 0;
    }

    // Readonly Members
    readonly struct Certificate
    {
        public readonly int Id;
        public readonly string Title;

        public Certificate(int id, string title)
        {
            Id = id;
            Title = title;
        }
    }
}
