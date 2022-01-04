//   **********    Dependencies    ******************
const dbConnect = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const util = require('util')
const { viewDepartments, viewEmployees, viewRoles, viewOneEmp } = require('./lib/viewQueries');
const { addDeptPrompt, addRolePrompt, addEmpPrompt } = require('./lib/addQueries')
const { updateEmpPrompt } = require('./lib/updateQueries')
//const { deleteDept } = require('./lib/deleteQueries');



// //  ************  REPEAT MENU Function  *********
// repeatPrompt = () => {
//   return inquirer.prompt([
//     {
//       type: 'confirm',
//       name: 'confirmAgain',
//       message: 'Would you like to do something else?',
//       default: false,
//     },
//   ])
//     .then(data => {

//       // determine whether or not another action is wantes
//       if (data.confirmAgain) {
//         optionPrompt()
//       } else {
//         // dbConnect.end(function (err) {
//           console.log('Thank you! Goodbye.')
//         // })
//       }
//     });
// }


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
          viewDepartments(optionPrompt);
          // optionPrompt();
          // repeatPrompt();
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
          viewRoles(optionPrompt);
          break;

        case 'View all employees':
          viewEmployees();
          // repeatPrompt();
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



// function viewRoles() {
//   const roleQuery = `SELECT 
//       role.id AS ID,  
//       role.title AS Title,  
//       CONCAT("$",FORMAT(role.salary,0)) AS Salary, 
//       department.dept_name AS Department
//         FROM role
//             LEFT JOIN department
//               ON role.department_id = department.dept_id`

//   dbConnect.promise().query(roleQuery)
//     .then(([rows]) => {
//       console.table(rows)
//       // repeatPrompt()
    
//     })
//     .then(optionPrompt())
//     .catch(console.log)
//   // .then( () => dbConnect.end())
// };



// // 
// function viewDepartments() {
//   // Query database from department table
//   // dbConnect.query('SELECT * FROM department', 
// //   function (err, results) {
// //     if (err) throw err;
// //     console.table(results);
// //   });
// // };

// const deptQuery = `SELECT 
// dept_id AS ID,  
// dept_name AS Name
// FROM department`

// // Question:  how do error throw? is catch enough?
// dbConnect.promise().query(deptQuery)
//   .then(([rows]) => {
//     console.table(rows)
//   })
//   .then
//   .catch(err => {
//   console.log(err);
//    })
// // .then( () => dbConnect.end())

// };








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