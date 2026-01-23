USE Day12DB;

SELECT '=== SELF JOIN (Trainer Hierarchy) ===' AS '';

SELECT t1.TrainerName AS Trainer, t2.TrainerName AS Manager
FROM Trainers t1
    LEFT JOIN Trainers t2 ON t1.ManagerId = t2.TrainerId;

SELECT '--- Students Table ---' AS '';

SELECT * FROM Students;

SELECT '--- Courses Table ---' AS '';

SELECT * FROM MyCourses;

SELECT '--- Trainers Table ---' AS '';

SELECT * FROM Trainers;