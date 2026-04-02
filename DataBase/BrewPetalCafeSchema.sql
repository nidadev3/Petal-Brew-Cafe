USE BrewPetalCafe;

--Categories Table
CREATE TABLE Categories (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL
);

--Product Table
CREATE TABLE Products (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CategoryId  INT NOT NULL,
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(500),
    Price DECIMAL(10,2) NOT NULL,
    ImageUrl NVARCHAR(300),
    Stock INT NOT NULL DEFAULT 0,
 
    FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);
