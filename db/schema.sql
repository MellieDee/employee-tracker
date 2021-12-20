/* Order of table creation and table drop depends on dependencies*/

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
);

CREATE TABLE roles (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INTEGER
  CONSTRAINT fk_department
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER
  CONSTRAINT fk_role
  FOREIGN KEY (roles_id)
  REFERENCES roles(id)
  ON DELETE SET NULL
  /* check if fk even if in same table*/,
  manager_id INTEGER
  CONSTRAINT fk_employee
  REFERENCES employees(id)
  ON DELETE SET NULL,
);