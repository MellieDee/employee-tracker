//   **********    Dependencies    ******************
const dbConnect = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const { viewDepartments, viewRoles, viewEmployees } = require('./lib/viewQueries')
// const { addDeptPrompt } = require('./lib/addQueries')



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
            'Update an employee Role',
            'Exit']
      }
    )
    .then((answer) => {
      console.log(answer)
      // answer.option  or destructure and pull option out  they are the same things
      switch (answer.option) {
        case 'View all departments':
          console.log('departments')
          viewDepartments();  
          // optionPrompt();
          // break;
          
          setTimeout(function() {
            optionPrompt()
          }, 1500);
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
          // setTimeout(function() {
          //   optionPrompt()
          // }, 1500);
          break;

      case 'Exit':
          dbConnect.end(function (err) {
            console.log('Thank you! Goodbye.')
          })
          break;

      default: 
      optionPrompt();
      break;

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
















//  **** Functions for ADDING Data   ****

// ================ Add Department  ================

const addDeptPrompt = () => {
  console.log(`

============= Add a Department   =============

`);
  return inquirer
    .prompt([
      // ** Department Name **
      {
        type: 'input',
        name: 'newDept',
        message: "What is the Department Name? (Required)",
        validate: newDeptInput => {
          if (newDeptInput) {
            return true;
          } else {
            console.log('Please enter the Department Name!');
            return false;
          }
        }
      }
    ])
    .then(data => {
      console.log(data)

      var addDeptQuery = `INSERT INTO department (dept_name) VALUES (?)`;

dbConnect.query(addDeptQuery, data.newDept, (err, result) => {
 if (err) throw err;
 console.log(`

 ============== New Department Added =============
        
        `);

        viewDepartments();

      });
    });
};




















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
  