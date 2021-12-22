INSERT INTO department (dept_id, dept_name)
VALUES
("1", "R & D"),
("2", "Marketing"),
("3", "Purchasing");

INSERT INTO role (id, title, salary, department_id)
VALUES
("19991", "R & D - L1", "40000.00", "1"),
("29991", "Sales & Mar - L1", "45000", "2"),
("39991", "Purch - L1", "50000", "3");

INSERT INTO employee (employee_id, first_name, last_name, role_id)
VALUES
("2344", "Jan", "Brady", "29991"),
("2345", "Marsha-Marsha", "Marsha", "39991");