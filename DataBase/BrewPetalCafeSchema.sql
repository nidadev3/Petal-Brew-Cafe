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
--Order Table
CREATE TABLE Orders (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    UserId      NVARCHAR(450) NOT NULL,
    OrderDate   DATETIME NOT NULL DEFAULT GETDATE(),
    Status      NVARCHAR(50) NOT NULL DEFAULT 'Pending',
    TotalAmount DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (UserId) REFERENCES AspNetUsers(Id)
);

--OrderItem Table
CREATE TABLE OrderItems (
    Id          INT PRIMARY KEY IDENTITY(1,1),
    OrderId     INT NOT NULL,
    ProductId   INT NOT NULL,
    Quantity    INT NOT NULL,
    UnitPrice   DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (OrderId)   REFERENCES Orders(Id),
    FOREIGN KEY (ProductId) REFERENCES Products(Id)
);

--Contact Message table
CREATE TABLE ContactMessages (
    Id      INT PRIMARY KEY IDENTITY(1,1),
    Name    NVARCHAR(100) NOT NULL,
    Email   NVARCHAR(200) NOT NULL,
    Message NVARCHAR(1000) NOT NULL,
    SentAt  DATETIME NOT NULL DEFAULT GETDATE()
);

INSERT INTO Categories (Name) VALUES
('Coffee'), ('Flowers'), ('Bakery');

INSERT INTO Products (CategoryId, Name, Description, Price, ImageUrl, Stock) VALUES
(1, 'Espresso', 'Strong and rich coffee shot.', 800, 'Images/Expresso.jpg', 50),
(1, 'Cappuccino', 'Smooth blend of espresso and creamy foam.', 800, 'Images/Cap.jpg', 50),
(1, 'Latte', 'Mild and creamy coffee.', 800, 'Images/coffee3.jpg', 50),
(2, 'Rose Bouquet', 'Classic symbol of love.', 800, 'Images/flower1.jpg', 20),
(2, 'Tulip Basket', 'Elegant and vibrant tulips.', 950, 'Images/flower2.jpg', 20),
(2, 'Mixed Floral Box', 'Beautiful mix of fresh blooms.', 1200, 'Images/flower3.jpg', 15),
(3, 'Chocolate Croissant', 'Flaky pastry with rich chocolate.', 450, 'Images/bakery1.jpg', 30),
(3, 'Cinnamon Roll', 'Soft roll with warm cinnamon and creamy glaze.', 500, 'Images/bakery2.jpg', 30),
(3, 'Blueberry Muffin', 'Moist muffin with fresh blueberries.', 400, 'Images/bakery3.jpg', 30);