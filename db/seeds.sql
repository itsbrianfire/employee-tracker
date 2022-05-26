INSERT INTO department (id, department_name)
VALUES (1, 'Sales'),
       (2, 'Engineering'),
       (3, 'Finance'),
       (4, 'Legal'),
       (5, 'Marketing');

INSERT INTO roles (title, salary)
VALUES ('Sr. Sales Manager', 85000),
       ('Sales Team Member', 52000),
       ('Lead Engineer', 120000),
       ('Software Developer', 75000),
       ('Sr. Account Mgr.', 90000),
       ('Account Mgr.', 60000),
       ('Legal Team Mgr.', 110000),
       ('Lawyer', 80000),
       ('Sr. Marketing Mgr.', 90000),
       ('Digtial Account Marketer', 70000);

INSERT INTO employees (first_name, last_name, manager)
VALUES ('Brian', 'Garcia', TRUE),
       ('Joe', 'Shmoe', FALSE),
       ('Porter', 'Robinson', TRUE),
       ('Norm', 'McDonald', FALSE),
       ('Peyton', 'Manning', TRUE),
       ('Lionel', 'Messi', FALSE),
       ('James', 'Taylor', TRUE),
       ('Kanye', 'West', FALSE),
       ('Winston', 'Churchill', TRUE),
       ('Ryan', 'Holiday', FALSE);