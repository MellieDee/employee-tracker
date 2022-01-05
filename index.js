//   **********    Dependencies    ******************
const dbConnect = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const util = require('util')
const { viewDepartments, viewEmployees, viewRoles } = require('./lib/viewQueries');
const { addDeptPrompt, addRolePrompt, addEmpPrompt } = require('./lib/addQueries')
// const { deleteDeptPrompt } = require('./lib/deleteQueries')
const { updateEmpPrompt } = require('./lib/updateQueries')



// //  ************  REPEAT MENU Function  *********
const repeatPrompt = () => {
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
        dbConnect.end(function (err) {
          console.log(`

========================= Thank You.  Good-Bye! =========================
                      
          `)
        })
      }
    });
}


//  **************  MAIN OPTION MENU   ***********
const optionPrompt = () => {
  console.log(`
  
  ================== Your Employee Tracker ==================



  ----------  Scroll in CLI to See Previous Tables  ---------
  
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
      // answer.option  or destructure and pull option out  they are the same things
      switch (answer.option) {

        case 'View all departments':
          console.log(`    
------------------------------------------------------------------------------------
`);
          viewDepartments(repeatPrompt);
          break;

        case 'View all roles':
          console.log(`    
------------------------------------------------------------------------------------
`);
          viewRoles(repeatPrompt);
          break;

        case 'View all employees':
          console.log(`    
---------------------------------------------------------------------------------------
`);
          viewEmployees(repeatPrompt);
          break;

        case 'Add a department':
          addDeptPrompt(repeatPrompt);
          break;


        case 'Add a role':
          addRolePrompt(repeatPrompt);
          break;


        case 'Add an employee':
          addEmpPrompt(repeatPrompt);
          break;

        case 'Update an employee role':
          updateEmpPrompt(repeatPrompt);
          break;


        // case 'Delete a department':
        //   deleteDeptPrompt(repeatPrompt);
        //   break;

        case 'Exit':
          dbConnect.end(function (err) {
            console.log(`

========================= Thank You.  Good-Bye! =========================
            
            `)
          })
          break;

        default:
          dbConnect.end(function (err) {
            console.log(`
            
            ========================= Thank You.  Good-Bye! =========================
            
            `)
          })
          break;
      }
    })
    .catch(err => {
      console.log(err);
    });
}




//  ** Running the app
optionPrompt()
// .then(optionPrompt)
//   // // .then(data => {

//   // })
//   .catch(err => {
//     console.log(err);
//   });



module.exports = optionPrompt



//  ******** DRAFT TIMEOUT   *******

  // setTimeout(function() {
  //   optionPrompt()
  // }, 1500);