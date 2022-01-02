//   **********    Dependencies    *********

const dbConnect = require('../db/connection');
require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees } = require('./viewQueries')
const cTable = require('console.table');




//   **** Functions for ADDING Data   ****

// ================ ADD DEPT  ================

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
      .then(answer => {
        console.log(answer)

        var addDeptQuery = `INSERT INTO department (dept_name) VALUES (?)`;
// try {
dbConnect.query(addDeptQuery, data.newDept, (err, result) => {
   if (err) throw err;
   console.log(`
  
============= You Added New Department: ${data.newDept} =============
          
          `);
          viewDepartments();
        });
      // } finally {
      //   dbConnect.release();
      // }
      });
  };
// ================ ADD DEPT ENDS  ================




// ================ ADD ROLE  ================

const addRolePrompt = () => {
  console.log(`

============= Add a Role   =============

`);
  return inquirer
    .prompt([
      // ** Get Role Name **
      {
        type: 'input',
        name: 'title',
        message: "What is the title of the new Role? (Required)",
        validate: titleInput => {
          if (titleInput) {
            return true;
          } else {
            console.log('Please enter the Role title!');
            return false;
          }
        }
      },
        // ** Get Role Salary **
      {
        type: 'number',
        name: 'salary',
        message: "What is the salary associated with this role? Enter numbers only, no symbols. Ex: 45000 (Required)",
        validate: salaryInput => {
          if(salaryInput) {
            return true;
          } else {
            console.log('Please enter the Salary!');
            return false;
          }
        }
      }
    ])
        // ** Get Dept Name **
      .then(answer => {
      // define [] w/ first two role column names for query in order to have something to push dept info to.
      const roleColumnValues = [answer.title, answer.salary];

      //get dept names
      dbConnect.query(`SELECT
      dept_id, dept_name FROM department`, (err, results) =>{
        if (err) throw err;

      //map [] as choice for inq.prompt
      const deptChoices =  results.map(({ dept_name, dept_id }) => ({ name: dept_name, value: dept_id }));

      inquirer.prompt([
        {
            type: 'list',
            name: 'deptForRole',
            message: "What Department is the Role in? (Required)",
            choices: deptChoices
        }
        ])
        .then(dept => {
        const deptAnswer = dept.deptForRole;
        roleColumnValues.push(deptAnswer)

        //takes User's Answer & match to dept_id then put into department_id column of final Insert Into role query
        var addRoleQuery = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

        dbConnect.query(addRoleQuery, roleColumnValues, (err, result) => {
        if (err) throw err;
        console.log(`

============= You Added New Role: ${answer.title} =============
        
          `);
          viewRoles();
        });
    // } finally {
    //   dbConnect.release();
    // }
      });
    });
  });
};
// ================ ADD ROLE ENDS ================


module.exports =
{
  addDeptPrompt,
  addRolePrompt
  // addEmployee
}









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

