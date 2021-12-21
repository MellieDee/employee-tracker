/* Order of table creation and table drop depends on dependencies*/

DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;


CREATE TABLE departments (
  dept_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INTEGER,
  CONSTRAINT fk_departments
  FOREIGN KEY (department_id)
  REFERENCES departments(dept_id)
  ON DELETE SET NULL
);

CREATE TABLE employees (
  employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  CONSTRAINT fk_role
  FOREIGN KEY (role_id)
  REFERENCES roles(role_id)
  ON DELETE SET NULL,
  /* check if fk even if in same table*/
  manager_id INTEGER,
  CONSTRAINT sr_fk_employee
  FOREIGN KEY (manager_id)
  REFERENCES employees(employee_id)
  ON DELETE SET NULL
);