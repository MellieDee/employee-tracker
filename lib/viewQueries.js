//  **** Dependencies    ****
const inquirer = require('inquirer');
const optionPrompt = require('..');
const dbConnect = require('../db/connection');
require('console.table');




//======== View Departments SQL Query =========
function viewDepartments(cb) {

  const deptQuery = `SELECT 
  dept_id AS ID,  
  dept_name AS Name
  FROM department`

  // Question:  how do error throw? is catch enough?
  dbConnect.promise().query(deptQuery)
    .then(([rows]) => {
      console.table(rows)
      cb();
    })
    .catch(err => {
      console.log(err);
    })
};
//======== View Departments ENDS =========


// ========  View Roles SQL Query  ========
function viewRoles(cb) {
  const roleQuery = `SELECT 
      role.id AS ID,  
      role.title AS Title,  
      CONCAT("$",FORMAT(role.salary,0)) AS Salary, 
      department.dept_name AS Department
        FROM role
            LEFT JOIN department
              ON role.department_id = department.dept_id`

  dbConnect.promise().query(roleQuery)
    .then(([rows]) => {
      console.table(rows);
      cb();
    })
    .catch(console.log)
  // .then( () => dbConnect.end())
};
// ========  View Roles ENDS  ========



//======= View EMPLOYEES SQL Query ==========
function viewEmployees(cb) {
  const empQuery = `SELECT 
        employees.id AS ID, 
        employees.first_name AS 'First Name', 
        employees.last_name AS 'Last Name', 
        role.title AS Title, 
        department.dept_name AS Department, 
        CONCAT("$",FORMAT(role.salary,0)) AS Salary, 
        CONCAT (man.first_name, " ", man.last_name) AS "Manager's Full Name"
          FROM employees
            LEFT JOIN role
              ON employees.role_id = role.id
            LEFT JOIN department
              ON role.department_id = department.dept_id
            LEFT JOIN employees man
              ON employees.manager_id = man.id`;

  dbConnect.promise().query(empQuery)
    .then(([rows]) => {
      console.table(rows)
      cb();
    })
    .catch(err => {
      console.error(err);
    })
};
//======= View EMPLOYEES ENDS ==========



//======== View EMPLOYEES SQL Query =========
const preViewEmp = () => {
  const empQuery = `SELECT 
        employees.id AS ID, 
        employees.first_name AS 'First Name', 
        employees.last_name AS 'Last Name', 
        role.title AS Title, 
        department.dept_name AS Department, 
        CONCAT("$",FORMAT(role.salary,0)) AS Salary, 
        CONCAT (man.first_name, " ", man.last_name) AS "Manager's Full Name"
          FROM employees
            LEFT JOIN role
              ON employees.role_id = role.id
            LEFT JOIN department
              ON role.department_id = department.dept_id
            LEFT JOIN employees man
              ON employees.manager_id = man.id`;

  dbConnect.promise().query(empQuery)
    .then(([rows]) => {
      console.table(rows)
    })
    .catch(err => {
      console.error(err);
    })
};
//======== View EMPLOYEES ENDS =========




module.exports =
{
  viewDepartments,
  viewRoles,
  viewEmployees,
  preViewEmp
}







//*************** DRAFT CODE ***************/


// function viewOneEmp() {
//   const oneEmpQuery = `SELECT 
//   employees.id AS ID, 
//   employees.first_name AS 'First Name', 
//   employees.last_name AS 'Last Name', 
//   role.title AS Title, 
//   department.dept_name AS Department, 
//   CONCAT("$",FORMAT(role.salary,0)) AS Salary, 
//   CONCAT (man.first_name, " ", man.last_name) AS "Manager's Full Name"
//     FROM employees
//       LEFT JOIN role
//         ON employees.role_id = role.id
//       LEFT JOIN department
//         ON role.department_id = department.dept_id
//       LEFT JOIN employees man
//         ON employees.manager_id = man.id
//       WHERE employees.id = ?`;

//   dbConnect.promise().query(oneEmpQuery)
//     .then(([rows]) => {
//       console.table(rows)
//     })
//     .catch(err => {
//       console.error(err);
//     })
// };