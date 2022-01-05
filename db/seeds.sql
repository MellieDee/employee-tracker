INSERT INTO department (dept_name)
VALUES
("R & D"),
("Marketing"),
("Purchasing");

INSERT INTO role (title, salary, department_id)
VALUES
("R & D - L1", "40000.00", "1"),
("Sales & Mar - L1", "45000", "2"),
("Purch - L1", "50000", "3");

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Jan", "Brady", "2", null),
("Marsha-Marsha", "Marsha", "3", null),
("Cindy", "In-Curls", "3", "2"),
("Peter", "Braydee", "2", "1");