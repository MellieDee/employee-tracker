//   **********    Dependencies    ******************
/* eslint-disable */
//  **** Dependencies    ****
const dbConnect = require('../db/connection');
require('console.table');





function viewOptions(answer) {

  switch (answer) {

    case 'View all departments':

      // Query database from department table
      dbConnect.query('SELECT * FROM department', function (err, results) {
        console.table(results);
      });

    case 'View all roles':
      dbConnect.query('SELECT * FROM role', function (err, results) 
      {
        console.table(results);
      });

    case 'View all employees':
      dbConnect.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
      });
  }
}



module.exports = viewOptions