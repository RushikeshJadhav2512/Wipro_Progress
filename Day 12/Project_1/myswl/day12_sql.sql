-- Day 12 - Project 1: Students, Courses, and Joins Demo

-- Create database
CREATE DATABASE IF NOT EXISTS Day12DB;

USE Day12DB;

-- Drop existing tables for clean execution
DROP TABLE IF EXISTS Students;

DROP TABLE IF EXISTS MyCourses;

DROP TABLE IF EXISTS Trainers;

-- Create Students table
CREATE TABLE Students (
    StudentId INT PRIMARY KEY,
    StudentName VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Age INT CHECK (Age >= 18),
    CourseId INT
);

-- Create Courses table
CREATE TABLE MyCourses (
    CourseId INT PRIMARY KEY,
    CourseName VARCHAR(100)
);

-- Create Trainers table (for self-join demo)
CREATE TABLE Trainers (
    TrainerId INT PRIMARY KEY,
    TrainerName VARCHAR(100),
    ManagerId INT
);

-- Insert Students data
INSERT INTO Students VALUES ( 1, 'Rahul', 'rahul@gmail.com', 20, 101 );

INSERT INTO Students VALUES ( 2, 'Neha', 'neha@gmail.com', 22, 102 );

INSERT INTO Students VALUES ( 3, 'Amit', 'amit@gmail.com', 19, 101 );

INSERT INTO Students VALUES ( 4, 'Priya', 'priya@gmail.com', 21, 103 );

INSERT INTO
    Students
VALUES (
        5,
        'Vikram',
        'vikram@gmail.com',
        20,
        NULL
    );
-- Student not enrolled

-- Insert Courses data
INSERT INTO MyCourses VALUES (101, 'Data Science');

INSERT INTO MyCourses VALUES (102, 'Web Development');

INSERT INTO MyCourses VALUES (103, 'Machine Learning');

INSERT INTO MyCourses VALUES (104, 'Cloud Computing');
-- Course with no students

-- Insert Trainers data (for self-join)
INSERT INTO Trainers VALUES (1, 'Dr. Smith', NULL);
-- HOD
INSERT INTO Trainers VALUES (2, 'Prof. Johnson', 1);
-- Reports to Smith
INSERT INTO Trainers VALUES (3, 'Prof. Williams', 1);
-- Reports to Smith
INSERT INTO Trainers VALUES (4, 'Prof. Brown', 2);
-- Reports to Johnson
INSERT INTO Trainers VALUES (5, 'Prof. Davis', 3);
-- Reports to Williams

-- ==================== AGGREGATE FUNCTIONS ====================
SELECT '=== AGGREGATE FUNCTIONS ===' AS '';

-- Total number of students
SELECT COUNT(*) AS TotalStudents FROM Students;

-- Average Age
SELECT AVG(Age) AS AverageAge FROM Students;

-- Sum of StudentIds (just for demo)
SELECT SUM(StudentId) AS SumOfIds FROM Students;

-- Maximum Age
SELECT MAX(Age) AS MaxAge FROM Students;

-- Minimum Age
SELECT MIN(Age) AS MinAge FROM Students;

-- ==================== ACCESS CONTROL (Note: GRANT/REVOKE may not work in all MySQL versions) ====================
SELECT '=== ACCESS CONTROL COMMANDS (for reference) ===' AS '';
-- GRANT SELECT, INSERT ON Students TO 'User1'@'localhost';
-- REVOKE INSERT ON Students FROM 'User1'@'localhost';

-- ==================== TABLE JOINS ====================
SELECT '=== TABLE JOINS ===' AS '';

-- INNER JOIN - Students with their courses
SELECT '--- INNER JOIN ---' AS '';

SELECT s.StudentName, s.StudentId, c.CourseName, c.CourseId
FROM Students s
    INNER JOIN MyCourses c ON s.CourseId = c.CourseId;

-- LEFT JOIN - All students including those not enrolled
SELECT '--- LEFT JOIN ---' AS '';

SELECT s.StudentName, s.StudentId, c.CourseName, c.CourseId
FROM Students s
    LEFT JOIN MyCourses c ON s.CourseId = c.CourseId;

-- RIGHT JOIN - All courses including those without students
SELECT '--- RIGHT JOIN ---' AS '';

SELECT s.StudentName, s.StudentId, c.CourseName, c.CourseId
FROM Students s
    RIGHT JOIN MyCourses c ON s.CourseId = c.CourseId;

-- FULL OUTER JOIN - All students and all courses
SELECT '--- FULL OUTER JOIN (simulated with UNION) ---' AS '';

SELECT s.StudentName, s.StudentId, c.CourseName, c.CourseId
FROM Students s
    LEFT JOIN MyCourses c ON s.CourseId = c.CourseId
UNION
SELECT s.StudentName, s.StudentId, c.CourseName, c.CourseId
FROM Students s
    RIGHT JOIN MyCourses c ON s.CourseId = c.CourseId;

-- CROSS JOIN - All possible student and course combinations
SELECT '--- CROSS JOIN ---' AS '';

SELECT s.StudentName, c.CourseName
FROM Students s
    CROSS JOIN MyCourses c;

-- ==================== SELF JOIN ====================
SELECT '=== SELF JOIN (Trainer Hierarchy) ===' AS '';

SELECT t1.TrainerName AS Trainer, t2.TrainerName AS Manager
FROM Trainers t1
    LEFT JOIN Trainers t2 ON t1.ManagerId = t2.TrainerId;

-- Final verification - Show all tables data
SELECT '=== FINAL DATA VERIFICATION ===' AS '';

SELECT '--- Students Table ---' AS '';

SELECT * FROM Students;

SELECT '--- Courses Table ---' AS '';

SELECT * FROM MyCourses;

SELECT '--- Trainers Table ---' AS '';

SELECT * FROM Trainers;