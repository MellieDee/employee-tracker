//   **********    Dependencies    ******************
/* eslint-disable */
//  **** Dependencies    ****
const dbConnect = require('../db/connection');
require('console.table');
const optionPropmt = require('../index');



//  **** Functions for Viewing Data   ****

// View Departments
function viewDepartments(action) {

  // Query database from department table
  dbConnect.query('SELECT * FROM department', function (err, results) {
    console.table(results);
    optionPrompt()
  });
};


// View Roles
function viewRoles(choices) {

  // Query database from department table
  dbConnect.query('SELECT * FROM role', function (err, results) {
    console.table(results);
  });
}


// View Employees
function viewEmployees(choices) {

  // Query database from department table
  dbConnect.query('SELECT * FROM employee', function (err, results) {

    console.table(results);
  });

};



// function viewOptions(choices) {

//   switch (answer.choices) {
//     case 'View all departments':
//       return viewDepartments()

//     case 'View all roles':
//       return viewRoles()

//     case 'View all employees':
//       return viewEmployees()
//   }
// }


// module.exports = viewOptions,
module.exports = 
{
  viewDepartments,
  viewRoles,
  viewEmployees
}



















//   switch (option.choices) {

//     case 'View all departments':

//       // Query database from department table
//       dbConnect.query('SELECT * FROM department', function (err, results) {
//         console.table(results);
//       });

//     case 'View all roles':
//       dbConnect.query('SELECT * FROM role', function (err, results) {
//         console.table(results);
//       });

//     case 'View all employees':
//       dbConnect.query('SELECT * FROM employee', function (err, results) {
//         console.table(results);
//       });
//   }
// }



