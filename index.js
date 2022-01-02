//   **********    Dependencies    ******************
const dbConnect = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const { viewDepartments, viewRoles, viewEmployees, viewOneEmp } = require('./lib/viewQueries');
const { addDeptPrompt, addRolePrompt, addEmpPrompt } = require('./lib/addQueries')
const { updateEmpPrompt} = require('./lib/updateQueries')
//const { deleteDept } = require('./lib/deleteQueries');


optionPrompt = () => {
  console.log(`
  
  ============== Your Employee Tracker =============
  
  `);
inquirer.prompt(  
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
            'Update an employee role',
            'Exit']
      }
    )
    .then(answer => {
      console.log(answer)
      // answer.option  or destructure and pull option out  they are the same things
      switch (answer.option) {
        case 'View all departments':
          console.log('departments')
          viewDepartments();  
          optionPrompt();
          break;
          
          // setTimeout(function() {
          //   optionPrompt()
          // }, 2000);
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

       
        case 'Add a department':
          addDeptPrompt();
          // optionPrompt();
          setTimeout(function() {
            optionPrompt()
          }, 1500);
          break;

          
        case 'Add a role':
          addRolePrompt();
          // optionPrompt();
          // setTimeout(function() {
          //   optionPrompt()
          // }, 1500);
          break;


        case 'Add an employee':
          addEmpPrompt();
          // optionPrompt();
          // setTimeout(function() {
          //   optionPrompt()
          // }, 1500);
          break;

        case 'Update an employee role':
          updateEmpPrompt();
          break;



        // case 'Delete a department':
        //   addDeptPrompt();
        //   optionPrompt();
        //   setTimeout(function() {
        //   optionPrompt()
        //   }, 1500);
        //   break;


      // case 'Exit':
      default:
          dbConnect.end(function (err) {
            console.log('Thank you! Goodbye.')
          })
          break;

      // default: 
      // optionPrompt();
      // break;

        } 

      })
      // .then(optionPrompt)

    }


// module.exports = {
//   optionPrompt
// }


 //  ** Running the app
   optionPrompt()
    // .then(choices => { 
    // return(choices)
    //    })
    //    .catch(err => {
    //      console.log(err);
    //    });