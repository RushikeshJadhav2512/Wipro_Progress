-- Day 11 - Project 1: Products Table Operations

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS ProductsDB;

USE ProductsDB;

-- Drop table if exists to allow re-running
DROP TABLE IF EXISTS Products;

-- 1. Create Products table
CREATE TABLE Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    Description VARCHAR(255),
    Price DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL,
    IsActive TINYINT(1) NOT NULL DEFAULT 1,
    CreatedDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insert 5 products
INSERT INTO
    Products (
        ProductName,
        Description,
        Price,
        Stock,
        IsActive
    )
VALUES (
        'Laptop',
        'High-performance laptop with 16GB RAM',
        999.99,
        50,
        1
    ),
    (
        'Smartphone',
        'Latest model with 5G capability',
        699.99,
        100,
        1
    ),
    (
        'Headphones',
        'Wireless noise-canceling headphones',
        199.99,
        75,
        1
    ),
    (
        'Tablet',
        '10-inch tablet for productivity',
        449.99,
        0,
        0
    ),
    (
        'Smartwatch',
        'Fitness tracking smartwatch',
        299.99,
        0,
        0
    );

-- 4. Update stock for one product
UPDATE Products SET Stock = 45 WHERE ProductName = 'Laptop';

-- 5. Delete inactive products
DELETE FROM Products WHERE IsActive = 0;

-- Final verification
SELECT
    ProductID,
    ProductName,
    Price,
    Stock,
    IsActive,
    CreatedDate
FROM Products;