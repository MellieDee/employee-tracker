//   **********    Dependencies    ******************
/* eslint-disable */
//  **** Dependencies    ****
const dbConnect = require('../db/connection');
require('console.table');





// function viewDepartments(choices) {

//   // Query database from department table
//   dbConnect.query('SELECT * FROM department', function (err, results) {
//     console.table(results);
//   });
// }

// function viewRoles(choices) {

//   // Query database from department table
//   dbConnect.query('SELECT * FROM role', function (err, results) {
//     console.table(results);
//   });
// }

// function viewEmployees(choices) {

//   // Query database from department table
//   dbConnect.query('SELECT * FROM employees', function (err, results) {
//     console.table(results);
//   });
// }


module.exports = showDepartments