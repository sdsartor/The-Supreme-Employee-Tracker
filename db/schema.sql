DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
-- This makes the employee database usable for this code.
USE employee_db;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30) NOT NULL
);
-- This creates three different tables and allows for primary keys to be exported to other tables.
CREATE TABLE role (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL NOT NULL,
department_id INT,
FOREIGN KEY (department_id)
REFERENCES department(id)
);

CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(35) NOT NULL,
role_id INT,
manager_id INT,
FOREIGN KEY (role_id)
REFERENCES role(id)
);