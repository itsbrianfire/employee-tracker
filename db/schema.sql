DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    department_id INT,
    -- deptName VARCHAR(100) NOT NULL,
    -- FOREIGN KEY (deptName) REFERENCES department(department_name)
    -- PRIMARY KEY (id)
    FOREIGN KEY (department_id) REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager BOOLEAN NOT NULL,
    department_id INT,
    -- role_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
    -- FOREIGN KEY (role_id) REFERENCES roles(id)
    ON DELETE SET NULL
);
