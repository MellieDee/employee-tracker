-- Order of table creation and table drop depends on dependencies

CREATE TABLE department (
  dept_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  role_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INTEGER,
  CONSTRAINT fk_department
  FOREIGN KEY (department_id)
  REFERENCES department(dept_id)
  ON DELETE CASCADE
);

CREATE TABLE employee (
  employee_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  emp_role_id INTEGER,
  CONSTRAINT fk_role
  FOREIGN KEY (emp_role_id)
  REFERENCES role(role_id)
  ON DELETE CASCADE,
  /* check if fk, even if in same table*/
  manager_id INTEGER,
  CONSTRAINT sr_fk_employee
  FOREIGN KEY (manager_id)
  REFERENCES employee(employee_id)
  ON DELETE SET NULL
);