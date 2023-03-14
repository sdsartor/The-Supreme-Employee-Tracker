INSERT INTO department (name)
VALUES 
("IT"),
("Finance"),
("Law"),
("Medical");

INSERT INTO role (department_id, role, salary)
VALUES (1, 'Software Engineer', 120,000),
(2, 'Financial Advisor', 97,000),
(3, 'Law Practice Manager', 127,000),
(4, 'Podiatrist', 170,000);
(1, 'Software Engineering Manager', 150,000),
(3, 'Criminal Defense Attorney', 103,000),
(4, 'Practice Manager', 77,000),
(2, 'Financial Manager', 110,000);


INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES
(1, 'Matthew', 'Sartor', null),
(3, 'Stewart', 'Wright', 1),
(4, 'Tobey', 'Shin', null),
(5, 'Tim', 'Short', 3),
(2, 'Bill', 'Hitchcock', null),
(7, 'Shannon', 'Carmichael' 5),
(8, 'Harry', 'Osborne', 6);
