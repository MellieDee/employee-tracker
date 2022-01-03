//   **********    Dependencies    ******************
const dbConnect = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const util = require('util')
const { viewDepartments, viewRoles, viewEmployees, viewOneEmp } = require('./lib/viewQueries');
const { addDeptPrompt, addRolePrompt, addEmpPrompt } = require('./lib/addQueries')
const { updateEmpPrompt } = require('./lib/updateQueries')
//const { deleteDept } = require('./lib/deleteQueries');



//  ************  REPEAT MENU Function  *********
repeatPrompt = () => {
  return inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmAgain',
      message: 'Would you like to do something else?',
      default: false,
    },
  ])
    .then(data => {

      // determine whether or not another action is wantes
      if (data.confirmAgain) {
        optionPrompt()
      } else {
        // dbConnect.end(function (err) {
          console.log('Thank you! Goodbye.')
        // })
      }
    });
}


//  **************  MAIN OPTION MENU   ***********
const optionPrompt = () => {
  console.log(`
  
  ============== Your Employee Tracker =============
  
  `);
  return inquirer.prompt(
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
      // console.log(answer)
      // answer.option  or destructure and pull option out  they are the same things
      switch (answer.option) {

        case 'View all departments':
          // console.log('departments')
          viewDepartments();
          repeatPrompt();
          // repeatPrompt()
          // .then(repeatPrompt)
          // .catch(err => {
          //   console.log(err);
          // });
          break;

        // setTimeout(function() {
        //   optionPrompt()
        // }, 2000);


        case 'View all roles':
          // console.log('roles')
          viewRoles();
          repeatPrompt();
          break;

        case 'View all employees':
          viewEmployees();
          repeatPrompt();
          break;

        case 'Add a department':
          addDeptPrompt();
          // repeatPrompt();
          break;


        case 'Add a role':
          addRolePrompt();
          // repeatPrompt();
          break;


        case 'Add an employee':
          addEmpPrompt();
          // repeatPrompt();
          break;

        case 'Update an employee role':
          updateEmpPrompt();
          // repeatPrompt();
          break;


        // case 'Delete a department':
        //   addDeptPrompt();
        //   optionPrompt();
        //   setTimeout(function() {
        //   optionPrompt()
        //   }, 1500);
        //   break;

        case 'Exit':
          dbConnect.end(function (err) {
            console.log('Thank you! Goodbye.')
          })
          break;

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
  // .then(data => {
  //   return repeatPrompt(data)
  // })
  // .catch(err => {
  //   console.log(err);
  //   });
}


//  ** Running the app
optionPrompt()
  .then(repeatPrompt())
  // .then(data => {

  // })
  .catch(err => {
    console.log(err);
  });



// module.exports = repeatPrompt()



//  ******** DRAFT TIMEOUT   *******

  // setTimeout(function() {
  //   optionPrompt()
  // }, 1500);