//   **********    Dependencies    ******************

/* eslint-disable */
//  **** Dependencies    ****
const dbConnect = require('../db/connection');
require('console.table');



//  **** Functions for ADDING Data   ****

// Add Department

function addDept(answer) {

dbConnect.query(`INSERT INTO department (dept_name) VALUES
(?)`, answer.dept_name, (err) => {
  if (err) {throw err} else {console.log('Department successfully added')}
});

}



module.exports = 
{
  addDept,
  addRole,
  addEmployee
}