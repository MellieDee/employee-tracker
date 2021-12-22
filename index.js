// functionName = (param -paren optional if only 1 Param-) => {}
// ask user for choice of To-Do - choicePrompt() in index.js collect as []

/* eslint-disable */

//   **********    Dependencies    ******************
const dbConnect = require('./db/connection');
const inquirer = require('inquirer');
const viewOptions = require('./lib/viewQueries');
require('console.table');



dbConnect.connect(function (err) {
  if (err) throw err;

  const optionPrompt = () => {
    console.log(`
  
  |====================== Welcome! ========================|
  |                                                        |
  |                                                        |
  |============= Search your Employee Database ============|
  |                                                        |
  |                                                        |
  |========= & May all beings have happy minds!  ==========|
  |                               attributed to Buddha     |
  |========================================================|
                                   

  `);


    return inquirer
      .prompt([
        // ****** Option Menu ******
        {
          type: 'list',
          name: 'option',
          message: 'What would you like to do?',
          choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee Role', 'Exit']
        }
      ])
      .then(answer => {
        console.log(answer.option)

        //   Check to see what the answer is
        return viewOptions(answer.option);
      })
  };

  // ** Running the app
  optionPrompt()
    .then(choice => {
      return viewOptions(choice)
    })
    .catch(err => {
      console.log(err);
    });

})
