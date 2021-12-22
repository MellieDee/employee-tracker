// functionName = (param -paren optional if only 1 Param-) => {}
// ask user for choice of To-Do - choicePrompt() in index.js collect as []

/* eslint-disable */

//   **********    Dependencies    ******************
const dbConnect = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const viewOptions = require('./lib/viewQueries');



dbConnect.connect(function (err) {
  if (err) throw err;
  

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
    .then(choice => {
      console.log(choice)
      return choice;
    })
  };

// ** Running the app
optionPrompt()
.then(answer => {
  return viewOptions(answer)
})
  .catch(err => {
    console.log(err);
  });

})
