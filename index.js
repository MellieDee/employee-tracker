// functionName = (param -paren optional if only 1 Param-) => {}
// ask user for choice of To-Do - choicePrompt() in index.js collect as []

/* eslint-disable */

//   **********    Dependencies    ******************
const dbConnect = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { viewDepartments, viewRoles, viewEmployees } = require('./lib/viewQueries')
const mysql = require('mysql2/promise');


const optionPrompt = () => {
  console.log(`
  
  ============== Your Employee Tracker =============
  
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
          console.log('departments')
          viewDepartments()  
          
          setTimeout(function() {
            optionPrompt()
          }, 2000);
          break;

        case 'View all roles':
          console.log('roles')
          viewRoles();

          setTimeout(function() {
            optionPrompt()
          }, 2000);
          break;

        case 'View all employees':
          viewEmployees();
          setTimeout(function() {
            optionPrompt()
          }, 2000);
          break;

       

        default:
          dbConnect.end(function (err) {
            console.log('Thank you! Goodbye.')
          })
        } 

      })
      // .then(optionPrompt)

    }














      // // ** Running the app
      optionPrompt()
        .then(choices => { 
      return(choices)
        })
        .catch(err => {
          console.log(err);
        });



// case 'Add a department':
    
      //   addDept();
      //   break;

      // case 'Add a role':
      //   addRoles();
      //     break;

      // case 'Add an employee':
      //   addEmployees();
      //   break;

      // case 'Update an employee Role':
      //    updateEmpRole();
      //   break;









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
  