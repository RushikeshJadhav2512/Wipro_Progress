create dATABASE ms_dynamicsDB;
USE ms_dynamicsDB;

CREATE TABLE FPO1
(
    FPOID INT IDENTITY(1,1) Primary KEY,
    FPOName VARCHAR(100) NOT NULL,
    myState VARCHAR(50) NOT NULL,
    MemberCount INT CHECK( MemberCount > 0),
    Registerations DATE NOT NULL
);

INSERT into FPO1
VALUES
    ('Greenharvest FPO', 'maharashtra', 250, '2022-06-15'),
    ('Agro Unity FPO ', 'Karnataka', 180, '2022-09-10');

Select *
from FPO1;

SELECT *
FROM FPO1
WHERE MemberCount > 200;

SELECT FPOName, myState
FROM FPO1
Where MemberCount <200;

--Updating values 

UPDate FPO1
SET MemberCount = 300
WHERE FPOName = 'Greenharvest FPO';

--Diff between Delete and Drop in SSMS
DELETE FROM FPO1
Where FPOName = 'Agro Unity FPO';

DROP TAbLE  FPO1;