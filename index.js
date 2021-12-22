// functionName = (param -paren optional if only 1 Param-) => {}
// ask user for choice of To-Do - choicePrompt() in index.js collect as []
/* eslint-disable */

//   **********    Dependencies    ******************
const db = require('./db/connection');
const inquirer = require('inquirer');
require('console.table');


const optionPrompt = () => {

  console.log (`
  
  ============== What do you want to do? =============
  
  `);


  return inquirer
    .prompt([
      // ****** Option Menu ******
      {
        type: 'list',
        name: 'option',
        message: 'Pick ONE license.',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee Role', 'Exit']
      }
    ])
    .then(optionData => {
    })
  };

// ** Running the app
optionPrompt()
.then(optionData => {
})
  .catch(err => {
    console.log(err);
  })
