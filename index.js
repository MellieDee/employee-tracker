// functionName = (param -paren optional if only 1 Param-) => {}
// ask user for choice of To-Do - choicePrompt() in index.js collect as []

/* eslint-disable */

//   **********    Dependencies    ******************
const dbConnect = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { viewDepartments, viewRoles, viewEmployees } = require('./lib/viewQueries');
// const viewOptions = require('./lib/viewQueries');
// const viewDepartments = require('./lib/viewQueries');




const optionPrompt = () => {
  console.log(`
  
  ============== Welcome to Employee Tracker! =============
  
  `);
  return inquirer
    .prompt([
      // ****** Option Menu ******
      {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices:
          ['View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee Role',
            'Exit']
      }
    ])
    .then((answer) => {
      console.log(answer)
      // answer.option  or destructure and pull option out  they are the same things
      switch (answer.option) {

        case 'View all departments':
          viewDepartments();
          break;

        case 'View all roles':
          viewRoles();
          break;

        case 'View all employees':
          viewEmployees();
          break;

        default:
          dbConnect.end(function (err) {
            console.log('Thank you! Goodbye.')
          })
        }
      })

    }
            // const { action } = answer


            //  if (action === 'View all departments') {

            // viewDepartments();

            //  }
            // if (action === 'Exit') {

            //   dbConnect.end(function (err) {
            //     console.log('Thank you! Goodbye.')
            //   });
            // }
 
        // viewRoles();
        // viewEmployees();
    



      // ** Running the app
      // optionPrompt()
      //   .then(choices => {
      //     return (choices)
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });

      module.exports = optionPrompt