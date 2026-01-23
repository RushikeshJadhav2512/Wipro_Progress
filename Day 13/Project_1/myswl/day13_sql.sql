-- ============================================================================
-- DAY 13 - PROJECT 1: Comprehensive Database Design & Best Practices
-- ============================================================================

-- Create Database
CREATE DATABASE IF NOT EXISTS Day13DB;

USE Day13DB;

-- ============================================================================
-- 1. MASTER DATA TABLES (with proper constraints, keys, and data types)
-- ============================================================================

-- Drop existing tables for clean execution
DROP TABLE IF EXISTS Enrollments;

DROP TABLE IF EXISTS Trainers;

DROP TABLE IF EXISTS Students;

DROP TABLE IF EXISTS Courses;

-- COURSES MASTER TABLE
CREATE TABLE Courses (
    CourseId INT AUTO_INCREMENT PRIMARY KEY,
    CourseName VARCHAR(100) NOT NULL,
    DurationWeeks INT NOT NULL,
    Fee DECIMAL(10, 2) NOT NULL,
    StartDate DATE,
    IsActive TINYINT(1) DEFAULT 1,
    CreatedDate DATETIME,
    UNIQUE KEY uk_course_name (CourseName),
    INDEX idx_course_name (CourseName),
    INDEX idx_active_courses (IsActive)
);

-- STUDENTS MASTER TABLE
CREATE TABLE Students (
    StudentId INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Phone VARCHAR(15),
    Age INT NOT NULL,
    City VARCHAR(50),
    RegistrationDate DATE,
    IsActive TINYINT(1) DEFAULT 1,
    CreatedDate DATETIME,
    UNIQUE KEY uk_email (Email),
    INDEX idx_student_email (Email),
    INDEX idx_active_students (IsActive)
);

-- TRAINERS MASTER TABLE
CREATE TABLE Trainers (
    TrainerId INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    Specialization VARCHAR(100),
    Salary DECIMAL(10, 2),
    HireDate DATE NOT NULL,
    ManagerId INT,
    IsActive TINYINT(1) DEFAULT 1,
    CreatedDate DATETIME,
    UNIQUE KEY uk_trainer_email (Email),
    FOREIGN KEY (ManagerId) REFERENCES Trainers (TrainerId) ON DELETE SET NULL,
    INDEX idx_trainer_email (Email),
    INDEX idx_manager (ManagerId)
);

-- ============================================================================
-- 2. TRANSACTION TABLE (Enrollments with Foreign Keys)
-- ============================================================================

CREATE TABLE Enrollments (
    EnrollmentId INT AUTO_INCREMENT PRIMARY KEY,
    StudentId INT NOT NULL,
    CourseId INT NOT NULL,
    EnrollmentDate DATE,
    CompletionDate DATE,
    Grade CHAR(1),
    Status VARCHAR(20) DEFAULT 'Enrolled',
    PaymentStatus VARCHAR(20) DEFAULT 'Pending',
    CreatedDate DATETIME,
    FOREIGN KEY (StudentId) REFERENCES Students (StudentId) ON DELETE RESTRICT,
    FOREIGN KEY (CourseId) REFERENCES Courses (CourseId) ON DELETE RESTRICT,
    INDEX idx_enrollment_student (StudentId),
    INDEX idx_enrollment_course (CourseId),
    INDEX idx_enrollment_status (Status)
);

-- ============================================================================
-- 3. INSERT MASTER DATA
-- ============================================================================

-- Insert Courses
INSERT INTO
    Courses (
        CourseName,
        DurationWeeks,
        Fee,
        StartDate,
        IsActive
    )
VALUES (
        'Data Science',
        12,
        50000.00,
        '2025-01-15',
        TRUE
    ),
    (
        'Web Development',
        8,
        35000.00,
        '2025-02-01',
        TRUE
    ),
    (
        'Machine Learning',
        16,
        75000.00,
        '2025-01-20',
        TRUE
    ),
    (
        'Cloud Computing',
        10,
        45000.00,
        '2025-03-01',
        FALSE
    ),
    (
        'DevOps',
        6,
        30000.00,
        '2025-02-15',
        TRUE
    );

-- Insert Students
INSERT INTO
    Students (
        FirstName,
        LastName,
        Email,
        Phone,
        Age,
        City
    )
VALUES (
        'Rahul',
        'Sharma',
        'rahul@gmail.com',
        '9876543210',
        22,
        'Mumbai'
    ),
    (
        'Neha',
        'Patel',
        'neha@gmail.com',
        '9876543211',
        24,
        'Delhi'
    ),
    (
        'Amit',
        'Kumar',
        'amit@gmail.com',
        '9876543212',
        21,
        'Bangalore'
    ),
    (
        'Priya',
        'Singh',
        'priya@gmail.com',
        '9876543213',
        23,
        'Mumbai'
    ),
    (
        'Vikram',
        ' Reddy',
        'vikram@gmail.com',
        '9876543214',
        25,
        'Chennai'
    ),
    (
        'Ananya',
        'Iyer',
        'ananya@gmail.com',
        '9876543215',
        22,
        'Hyderabad'
    ),
    (
        'Ravi',
        'Menon',
        'ravi@gmail.com',
        '9876543216',
        20,
        'Pune'
    ),
    (
        'Pooja',
        'Nair',
        'pooja@gmail.com',
        '9876543217',
        24,
        'Kolkata'
    );

-- Insert Trainers (with self-referencing ManagerId)
INSERT INTO
    Trainers (
        FirstName,
        LastName,
        Email,
        Specialization,
        Salary,
        HireDate,
        ManagerId
    )
VALUES (
        'Dr.',
        'Smith',
        'smith@gmail.com',
        'Data Science',
        120000.00,
        '2020-01-01',
        NULL
    ), -- HOD
    (
        'Prof.',
        'Johnson',
        'johnson@gmail.com',
        'Web Development',
        90000.00,
        '2021-03-15',
        1
    ),
    (
        'Prof.',
        'Williams',
        'williams@gmail.com',
        'Machine Learning',
        100000.00,
        '2021-06-01',
        1
    ),
    (
        'Prof.',
        'Brown',
        'brown@gmail.com',
        'Cloud Computing',
        85000.00,
        '2022-01-10',
        2
    ),
    (
        'Prof.',
        'Davis',
        'davis@gmail.com',
        'DevOps',
        80000.00,
        '2022-04-20',
        2
    );

-- Insert Enrollments
INSERT INTO
    Enrollments (
        StudentId,
        CourseId,
        EnrollmentDate,
        Grade,
        Status,
        PaymentStatus
    )
VALUES (
        1,
        1,
        '2025-01-10',
        NULL,
        'Enrolled',
        'Pending'
    ),
    (
        1,
        2,
        '2025-01-12',
        'A',
        'Completed',
        'Paid'
    ),
    (
        2,
        1,
        '2025-01-15',
        'B',
        'Completed',
        'Paid'
    ),
    (
        2,
        3,
        '2025-01-20',
        NULL,
        'InProgress',
        'Paid'
    ),
    (
        3,
        2,
        '2025-02-01',
        NULL,
        'Enrolled',
        'Pending'
    ),
    (
        3,
        4,
        '2025-02-05',
        'C',
        'Completed',
        'Refunded'
    ),
    (
        4,
        3,
        '2025-01-25',
        'A',
        'Completed',
        'Paid'
    ),
    (
        5,
        5,
        '2025-02-20',
        NULL,
        'Enrolled',
        'Pending'
    ),
    (
        6,
        1,
        '2025-01-18',
        'B',
        'Completed',
        'Paid'
    ),
    (
        7,
        2,
        '2025-02-10',
        NULL,
        'Enrolled',
        'Pending'
    ),
    (
        8,
        3,
        '2025-01-28',
        'A',
        'Completed',
        'Paid'
    );

-- ============================================================================
-- 4. AGGREGATE FUNCTIONS & REPORTING
-- ============================================================================

SELECT '=== AGGREGATE FUNCTIONS & REPORTING ===' AS '';

-- Total students
SELECT COUNT(*) AS TotalStudents FROM Students;

-- Total courses
SELECT COUNT(*) AS TotalCourses FROM Courses;

-- Total enrollments
SELECT COUNT(*) AS TotalEnrollments FROM Enrollments;

-- Average age of students
SELECT AVG(Age) AS AverageStudentAge FROM Students;

-- Total revenue from completed payments
SELECT SUM(c.Fee) AS TotalRevenue
FROM Enrollments e
    JOIN Courses c ON e.CourseId = c.CourseId
WHERE
    e.PaymentStatus = 'Paid';

-- Count by status
SELECT Status, COUNT(*) AS Count FROM Enrollments GROUP BY Status;

-- Count by payment status
SELECT PaymentStatus, COUNT(*) AS Count
FROM Enrollments
GROUP BY
    PaymentStatus;

-- Average fee per course
SELECT AVG(Fee) AS AverageCourseFee FROM Courses;

-- Min and Max course fees
SELECT MIN(Fee) AS MinFee, MAX(Fee) AS MaxFee FROM Courses;

-- ============================================================================
-- 5. TABLE JOINS (Reporting Queries)
-- ============================================================================

SELECT '=== TABLE JOINS - REPORTING QUERIES ===' AS '';

-- INNER JOIN: Students with their enrollments and course details
SELECT CONCAT(s.FirstName, ' ', s.LastName) AS StudentName, s.Email, c.CourseName, e.EnrollmentDate, e.Grade, e.Status, e.PaymentStatus
FROM
    Students s
    INNER JOIN Enrollments e ON s.StudentId = e.StudentId
    INNER JOIN Courses c ON e.CourseId = c.CourseId
ORDER BY e.EnrollmentDate;

-- LEFT JOIN: All courses with enrollment count (even courses with 0 enrollments)
SELECT c.CourseName, COUNT(e.EnrollmentId) AS EnrollmentCount, COALESCE(
        SUM(
            CASE
                WHEN e.PaymentStatus = 'Paid' THEN c.Fee
                ELSE 0
            END
        ), 0
    ) AS Revenue
FROM Courses c
    LEFT JOIN Enrollments e ON c.CourseId = e.CourseId
GROUP BY
    c.CourseName;

-- RIGHT JOIN: All trainers with their managers (including top-level managers)
SELECT CONCAT(t.FirstName, ' ', t.LastName) AS Trainer, t.Specialization, CONCAT(m.FirstName, ' ', m.LastName) AS Manager
FROM Trainers t
    RIGHT JOIN Trainers m ON t.ManagerId = m.TrainerId;

-- SELF JOIN: Full trainer hierarchy (Tree structure)
SELECT
    CONCAT(t.FirstName, ' ', t.LastName) AS Employee,
    t.Specialization,
    IFNULL(
        CONCAT(m.FirstName, ' ', m.LastName),
        'Top Level'
    ) AS ReportsTo,
    t.TrainerId,
    m.TrainerId AS ManagerId
FROM Trainers t
    LEFT JOIN Trainers m ON t.ManagerId = m.TrainerId
ORDER BY t.TrainerId;

-- CROSS JOIN: All possible student-course combinations for analysis
SELECT CONCAT(s.FirstName, ' ', s.LastName) AS StudentName, c.CourseName, c.Fee
FROM Students s
    CROSS JOIN Courses c
WHERE
    c.IsActive = TRUE
ORDER BY s.StudentId, c.CourseName;

-- ============================================================================
-- 6. TRANSACTIONS & DATA INTEGRITY
-- ============================================================================

SELECT '=== TRANSACTIONS & DATA INTEGRITY ===' AS '';

-- Start transaction for batch insert
START TRANSACTION;

-- Insert new enrollment
INSERT INTO
    Enrollments (
        StudentId,
        CourseId,
        EnrollmentDate,
        Status,
        PaymentStatus
    )
VALUES (
        5,
        1,
        CURDATE(),
        'Enrolled',
        'Pending'
    );

-- Update payment status after payment
UPDATE Enrollments
SET
    PaymentStatus = 'Paid'
WHERE
    StudentId = 5
    AND CourseId = 1
    AND Status = 'Enrolled';

COMMIT;

-- ============================================================================
-- 7. SECURITY: GRANT & REVOKE (Note: MySQL syntax)
-- ============================================================================

SELECT '=== SECURITY (GRANT/REVOKE) ===' AS '';
-- MySQL Grant/Revoke syntax (executed separately with appropriate privileges)
-- GRANT SELECT, INSERT ON Day13DB.Enrollments TO 'app_user'@'localhost';
-- REVOKE INSERT ON Day13DB.Enrollments FROM 'app_user'@'localhost';

SELECT 'GRANT/REVOKE commands documented for reference' AS Note;

-- ============================================================================
-- 8. STORED PROCEDURES
-- ============================================================================

DELIMITER /
/

-- Procedure to get student enrollment details
DROP PROCEDURE IF EXISTS GetStudentEnrollments /
/

CREATE PROCEDURE GetStudentEnrollments(IN student_id INT)
BEGIN
    SELECT 
        CONCAT(s.FirstName, ' ', s.LastName) AS StudentName,
        s.Email,
        c.CourseName,
        e.EnrollmentDate,
        e.Status,
        e.PaymentStatus,
        c.Fee
    FROM Students s
    INNER JOIN Enrollments e ON s.StudentId = e.StudentId
    INNER JOIN Courses c ON e.CourseId = c.CourseId
    WHERE s.StudentId = student_id;
END
/
/

-- Procedure to get course statistics
DROP PROCEDURE IF EXISTS GetCourseStatistics /
/

CREATE PROCEDURE GetCourseStatistics()
BEGIN
    SELECT 
        c.CourseName,
        COUNT(e.EnrollmentId) AS TotalEnrollments,
        AVG(e.Grade) AS AverageGrade,
        SUM(CASE WHEN e.PaymentStatus = 'Paid' THEN 1 ELSE 0 END) AS PaidCount,
        SUM(CASE WHEN e.PaymentStatus = 'Pending' THEN 1 ELSE 0 END) AS PendingCount
    FROM Courses c
    LEFT JOIN Enrollments e ON c.CourseId = e.CourseId
    GROUP BY c.CourseName;
END
/
/

DELIMITER;

-- Call stored procedures
SELECT '=== STORED PROCEDURES ===' AS '';

CALL GetStudentEnrollments (1);

CALL GetCourseStatistics ();

-- ============================================================================
-- 9. FINAL DATA VERIFICATION
-- ============================================================================

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

SELECT t.TrainerId, CONCAT(t.FirstName, ' ', t.LastName) AS Name, t.Specialization, t.ManagerId, CONCAT(m.FirstName, ' ', m.LastName) AS ReportsTo
FROM Trainers t
    LEFT JOIN Trainers m ON t.ManagerId = m.TrainerId;

SELECT '--- Enrollments ---' AS '';

SELECT e.EnrollmentId, CONCAT(s.FirstName, ' ', s.LastName) AS StudentName, c.CourseName, e.EnrollmentDate, e.Grade, e.Status, e.PaymentStatus
FROM
    Enrollments e
    JOIN Students s ON e.StudentId = s.StudentId
    JOIN Courses c ON e.CourseId = c.CourseId;