//   **********    Dependencies    ******************
/* eslint-disable */
//  **** Dependencies    ****
const dbConnect = require('../db/connection');
require('console.table');



//  **** Functions for Viewing Data   ****

// // View Departments

function viewDepartments() {
  //   // Query database from department table
  //   dbConnect.query('SELECT * FROM department', function (err, results) {
  //     console.table(results);
  //   });

  // };

  dbConnect.promise().query(`SELECT * FROM department`)
    .then(([rows]) => {
      console.table(rows)
    })
    .catch(console.log)
  // .then( () => dbConnect.end())

};


// View Roles
function viewRoles(choices) {
  const roleQuery = `SELECT 
      role.id AS ID,  
      role.title AS Title,  
      CONCAT("$",FORMAT(role.salary,2)) AS Salary, 
      department.dept_name AS Department
        FROM role
            LEFT JOIN department
              ON role.department_id = department.dept_id`

  dbConnect.promise().query(roleQuery)
    .then(([rows]) => {
      console.table(rows)
    })
    .catch(console.log)
  // .then( () => dbConnect.end())
};




// View Employees
function viewEmployees() {

  // set const for query from employees, role & dept tables
  const empQuery = `SELECT 
        employees.id AS ID, 
        employees.first_name AS 'First Name', 
        employees.last_name AS 'Last Name', 
        role.title AS Title, 
        department.dept_name AS Department, 
        role.salary AS Salary, 
        employees.manager_id AS Manager
          FROM employees
            LEFT JOIN role
              ON employees.role_id = role.id
            LEFT JOIN department
              ON role.department_id = department.dept_id;`

  // Perform Query 
  // dbConnect.query(empQuery, 
  //    (err, results) => {
  //   if (err) throw err;

  // })
  // .then(results =>
  //    console.table(results));
  // optionPrompt();


  dbConnect.promise().query(empQuery)
    .then(([rows]) => {
      console.table(rows)
    })
    // .then(optionPrompt())
    .catch(console.log)
  // .then( () => dbConnect.end())
};



module.exports =
{
  viewDepartments,
  viewRoles,
  viewEmployees
}










//   ************* DRAFT CODE *****************



//   // Query database from department table
//   dbConnect.query('SELECT * FROM role', function (err, results) {
//     console.table(results);
//   });
// }



// View Employees
// function viewEmployees(choices) {

//   // Query database from department table
//   dbConnect.query('SELECT * FROM employees', function (err, results) {
//     console.table(results);
//   });
// };

