using System;
using System.Collections.Generic;
using System.Collections.Concurrent;

namespace ETMS
{
   
    class Course
    {
        public string Code;
        public string Name;
    }

    class EnrollmentRequest
    {
        public int LearnerId;
        public string CourseCode;
    }

    class AdminAction
    {
        public string ActionName;
    }

    class Session
    {
        public string Topic;
    }

    class Enrollment
    {
        public int LearnerId;
        public string CourseCode;
    }

    class Program
    {
        static void Main()
        {
           
            List<Course> courses = new List<Course>();
            courses.Add(new Course { Code = "C101", Name = "AI Basics" });
            courses.Add(new Course { Code = "C102", Name = "Data Science" });

            Console.WriteLine("Courses:");
            foreach (var c in courses)
                Console.WriteLine($"{c.Code} - {c.Name}");

            Console.WriteLine();

            
            Dictionary<string, Course> courseMap = new Dictionary<string, Course>();
            foreach (var c in courses)
                courseMap[c.Code] = c;

            Console.WriteLine("Fast lookup for C101:");
            Console.WriteLine(courseMap["C101"].Name);

            Console.WriteLine();

           
            HashSet<int> enrolledLearners = new HashSet<int>();
            enrolledLearners.Add(1);

            if (!enrolledLearners.Add(1))
                Console.WriteLine("Learner already enrolled!");

            Console.WriteLine();

            
            Queue<EnrollmentRequest> enrollmentQueue = new Queue<EnrollmentRequest>();
            enrollmentQueue.Enqueue(new EnrollmentRequest { LearnerId = 1, CourseCode = "C101" });
            enrollmentQueue.Enqueue(new EnrollmentRequest { LearnerId = 2, CourseCode = "C102" });

            Console.WriteLine("Processing Enrollment Requests:");
            while (enrollmentQueue.Count > 0)
            {
                var req = enrollmentQueue.Dequeue();
                Console.WriteLine($"Learner {req.LearnerId} enrolled in {req.CourseCode}");
            }

            Console.WriteLine();

            
            Stack<AdminAction> adminActions = new Stack<AdminAction>();
            adminActions.Push(new AdminAction { ActionName = "Add Course" });
            adminActions.Push(new AdminAction { ActionName = "Delete Course" });

            var lastAction = adminActions.Pop();
            Console.WriteLine($"Undo Action: {lastAction.ActionName}");

            Console.WriteLine();

            
            SortedList<DateTime, Session> sessions = new SortedList<DateTime, Session>();
            sessions.Add(new DateTime(2026, 1, 10), new Session { Topic = "ML Intro" });
            sessions.Add(new DateTime(2026, 1, 5), new Session { Topic = "Python Basics" });

            Console.WriteLine("Sessions Sorted by Date:");
            foreach (var s in sessions)
                Console.WriteLine($"{s.Key.ToShortDateString()} - {s.Value.Topic}");

            Console.WriteLine();

           
            ConcurrentDictionary<int, Enrollment> enrollments =
                new ConcurrentDictionary<int, Enrollment>();

            enrollments.TryAdd(1, new Enrollment { LearnerId = 1, CourseCode = "C101" });

            Console.WriteLine("Concurrent Enrollment Added Successfully");

            Console.WriteLine("\nETMS execution completed.");
        }
    }
}