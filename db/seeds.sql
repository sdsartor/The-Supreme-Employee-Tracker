USE employee_db;

INSERT INTO department (id, dept_name)
VALUES 
(1, "Sales"),
(2, "Retail");
-- This is the field where the data will be stored.
INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Sales Associate", 35000, 1),
       (2, "Shelf Stocker", 30000, 1);

INSERT INTO employee (id, first_name, last_name, role_id)
VALUES
(1, "Jane", "Doe", 1);


