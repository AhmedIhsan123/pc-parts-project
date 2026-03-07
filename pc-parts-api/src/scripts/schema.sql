DROP DATABASE IF EXISTS pcparts;
CREATE DATABASE pcparts;
USE pcparts;

-- Categories table
CREATE TABLE categories (
    category VARCHAR(100) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    product_description TEXT,
    specs JSON NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    image_url VARCHAR(500),
    rating DECIMAL(2,1) DEFAULT NULL CHECK (rating >= 0.0 AND rating <= 5.0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_name)
        REFERENCES categories(category)
        ON DELETE CASCADE
);