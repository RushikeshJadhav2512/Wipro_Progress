USE Day13DB;

SELECT '=== STORED PROCEDURES OUTPUT ===' AS '';

-- Call stored procedures
SELECT '--- GetStudentEnrollments(1) ---' AS '';

CALL GetStudentEnrollments (1);

SELECT '--- GetCourseStatistics() ---' AS '';

CALL GetCourseStatistics ();

SELECT '=== FINAL DATA VERIFICATION ===' AS '';

SELECT '--- Courses ---' AS '';

SELECT * FROM Courses;

SELECT '--- Students ---' AS '';

SELECT
    StudentId,
    FirstName,
    LastName,
    Email,
    Age,
    City,
    IsActive
FROM Students;

SELECT '--- Trainers (Hierarchy) ---' AS '';

SELECT t.TrainerId, CONCAT(t.FirstName, ' ', t.LastName) AS Name, t.Specialization, t.ManagerId, IFNULL(
        CONCAT(m.FirstName, ' ', m.LastName), 'Top Level (HOD)'
    ) AS ReportsTo
FROM Trainers t
    LEFT JOIN Trainers m ON t.ManagerId = m.TrainerId
ORDER BY t.TrainerId;

SELECT '--- Enrollments ---' AS '';

SELECT e.EnrollmentId, CONCAT(s.FirstName, ' ', s.LastName) AS StudentName, c.CourseName, e.EnrollmentDate, e.Grade, e.Status, e.PaymentStatus
FROM
    Enrollments e
    JOIN Students s ON e.StudentId = s.StudentId
    JOIN Courses c ON e.CourseId = c.CourseId
ORDER BY e.EnrollmentId;