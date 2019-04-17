CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (

    item_id INTEGER AUTO_INCREMENT NOT NULL,

    product_name VARCHAR(100) NOT NULL,

    department_name VARCHAR(50) NOT NULL,

    price DECIMAL(10,4) NOT NULL,

    stock_quantity INTEGER(500) NOT NULL,

    PRIMARY KEY (item_id)
);

insert into products (product_name, department_name, price, stock_quantity) values ('Veribet', 'Legal', '4.33', 56),
('Zoolab', 'Business Development', '3.54', 92),
('Y-find', 'Human Resources', '6.90', 68),
('Daltfresh', 'Engineering', '8.89', 76),
('Transcof', 'Accounting', '8.47', 98),
('Konklab', 'Support', '0.45', 19),
('Zamit', 'Legal', '6.31', 91),
('Regrant', 'Sales', '44.66', 3),
('Biodex', 'Engineering', '5.73', 55),
( 'Watchover', 'Training', '9.91', 63);

SELECT * FROM bamazon_db.products;
