//   **********    Dependencies    ******************

/* eslint-disable */
//  **** Dependencies    ****
const dbConnect = require('../db/connection');
require('console.table');
const inquirer = require('inquirer');
// const { viewDepartments, viewRoles, viewEmployees } = require('./viewQueries')




// //  **** Functions for ADDING Data   ****

// // ================ Add Department  ================

//   const addDeptPrompt = () => {
//     console.log(`

//   ============= Add a Department   =============

//   `);
//     return inquirer
//       .prompt([
//         // ** Department Name **
//         {
//           type: 'input',
//           name: 'newDept',
//           message: "What is the Department Name? (Required)",
//           validate: newDeptInput => {
//             if (newDeptInput) {
//               return true;
//             } else {
//               console.log('Please enter the Department Name!');
//               return false;
//             }
//           }
//         }
//       ])
//       .then(data => {
//         console.log(data)

//         var addDeptQuery = `INSERT INTO department (dept_name) VALUES (?)`;

// dbConnect.query(addDeptQuery, data.newDept, (err, result) => {
//    if (err) throw err;
//    console.log(`
  
//    ============== New Department Added =============
          
//           `);

//           viewDepartments();

//         });
//       });
//   };






// module.exports =
// {
//   addDeptPrompt
//   // addRole,
//   // addEmployee
// }









//  *********  DRAFT CODE  **********


// before dept mysql txt?
//dbConnect.connect(function (err) {
//   if (err) throw err;



// dbConnect.query(`INSERT INTO department (dept_name) 
// VALUES ${newDeptName}`, department(dept_name), (err) => {
//     if (err) { throw err 
//     } else { console.log('Department successfully added') }
//   });
// })
// };
// addDeptPrompt()
// };


    
// case 'Add a department':

//   addDeptPrompt(optionPrompt);

//     // addDeptPrompt()
//     // .then(answer => { 
//     //   return optionPrompt();
//     // })
//     // .catch(err => {
//     //   console.log(err);
//     // });

//     // setTimeout(function() {
//     //   optionPrompt()
//     // }, 2000);
//     break;

