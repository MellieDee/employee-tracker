//  **** Dependencies    ****
const inquirer = require('inquirer');
const optionPrompt = require('..');
const dbConnect = require('../db/connection');
require('console.table');
// const { optionPrompt } = require('../index')


//=========  Functions for Viewing Data  =========




//============== View Departments SQL Query =================
function viewDepartments(cb) {
    // Query database from department table
    // dbConnect.query('SELECT * FROM department', 
  //   function (err, results) {
  //     if (err) throw err;
  //     console.table(results);
  //   });
  // };

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
  // .then( () => dbConnect.end())

};


// //  ===============  View Roles SQL Query  ==================
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
      cb()
      // repeatPrompt()
    })
    .catch(console.log)
  // .then( () => dbConnect.end())
};




//============== View EMPLOYEES SQL Query =================
function viewEmployees() {
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

  // Perform Query 
    // emp.first_name AS Manager
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


// db.query(`DELETE FROM books WHERE id = ?`, deletedRow, (err, result) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result);
// });


// ***** VS ****
// // Query database
// db.query('SELECT * FROM books', function (err, results) {
//   console.log(results);
// });




//   // Query database from department table
//   dbConnect.query('SELECT * FROM role', function (err, results) {
//     console.table(results);
//   });
// }


//sample from w3schools:
// con.connect(function(err) {
//   if (err) throw err;
//   var sql = "DELETE FROM customers WHERE address = 'Mountain 21'";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records deleted: " + result.affectedRows);
//   });
// });




// View Employees
// function viewEmployees(choices) {

//   // Query database from department table
//   dbConnect.query('SELECT * FROM employees', function (err, results) {
//     console.table(results);
//   });
// };

