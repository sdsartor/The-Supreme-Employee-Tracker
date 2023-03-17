INSERT INTO department (name)
VALUES 
("IT"),
("Finance"),
("Law"),
("Medical");
-- This is the field where the data will be stored.
INSERT INTO role (department_id, title, salary)
VALUES (1, 'Software Engineer', 120000),
(2, 'Financial Advisor', 97000),
(3, 'Law Practice Manager', 127000),
(4, 'Podiatrist', 170000),
(1, 'Software Engineering Manager', 150000),
(3, 'Criminal Defense Attorney', 103000),
(4, 'Practice Manager', 77000),
(2, 'Financial Manager', 110000);
-- Employee information will be stored here.

INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES
(1, 'Matthew', 'Sartor', null),
(3, 'Stewart', 'Wright', 1),
(4, 'Tobey', 'Shin', null),
(5, 'Tim', 'Short', 3),
(2, 'Bill', 'Hitchcock', null),
(7, 'Shannon', 'Carmichael' 5),
(8, 'Harry', 'Osborne', 6);
