-- Verification script - writes results to a file
USE ProductsDB;

-- Show all products
SELECT '=== ALL PRODUCTS ===' AS '';

SELECT * FROM Products INTO OUTFILE '/tmp/products_all.txt';

-- Show products after update
SELECT '=== AFTER STOCK UPDATE ===' AS '';

SELECT *
FROM Products
WHERE
    ProductName = 'Laptop' INTO OUTFILE '/tmp/products_update.txt';

-- Show final products
SELECT '=== FINAL PRODUCTS (after deleting inactive) ===' AS '';

SELECT * FROM Products INTO OUTFILE '/tmp/products_final.txt';

SELECT 'Verification complete! Check /tmp/products_*.txt files';