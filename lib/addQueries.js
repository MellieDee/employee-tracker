//   **********    Dependencies    *********
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees } = require('./viewQueries')
const cTable = require('console.table');
const dbConnect = require('../db/connection');




// ================ ADD DEPT  ================

const addDeptPrompt = (cb) => {
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
      // console.log(answer)

      const addDeptQuery = `INSERT INTO department (dept_name) VALUES (?)`;

      dbConnect.query(addDeptQuery, answer.newDept, (err, result) => {
        if (err) throw err;
        console.log(`
  
-------------------- You Added New Department: ${answer.newDept} -------------------
          `);
        console.log(`    
------------------------------------------------------------------------------------
`);
        viewDepartments(cb);
      });
    });
};
// ================ ADD DEPT ENDS  ================




// ==================   ADD ROLE  ==================

const addRolePrompt = (cb) => {
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
        type: 'input',
        name: 'salary',
        message: "What is the salary associated with this role? Enter numbers only, no symbols. Ex: 45000 (Required)",
        validate: salaryInput => {
          if (isNaN(salaryInput)) {
            console.log('Please enter the Salary!');
            return false;
          } else {
            return true;
          }
        }
      }
    ])
    //  ** Create Dept[] for Inq Prompt Answer Choices
    .then(answer => {
      // define [] w/ first two role column names for query in order to have something to push dept info to.
      const roleColumnValues = [answer.title, answer.salary];

      //  ** Get Dept Names/ids **
      dbConnect.query(`SELECT
      dept_id,
      dept_name
      FROM department`, (err, results) => {
        if (err) throw err;

        //  ** Map [] as choice for inq.prompt  **
        const deptChoices = results.map(({ dept_name, dept_id }) => ({ name: dept_name, value: dept_id }));

        inquirer.prompt([
          {
            type: 'list',
            name: 'deptForRole',
            message: "What Department is the Role in? (Required)",
            choices: deptChoices
          }
        ])
          .then(answer => {
            const deptAnswer = answer.deptForRole;
            roleColumnValues.push(deptAnswer)

            //  ** Take User's answer & match to dept_id then put into department_id column of final Insert Into role query
            const addRoleQuery = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;

            dbConnect.query(addRoleQuery, roleColumnValues, (err, result) => {
              if (err) throw err;
              console.log(`

------ You Added New Role Title Called: ${answer.title} ------
        
      `);
              viewRoles(cb);
            });
          });
      });
    });
};
// ================ ADD ROLE ENDS ================




// ==================   ADD EMPLOYEE  ==================

const addEmpPrompt = (cb) => {

  // ** Define [] w/ employee column names for query in order to have something to push role info to.
  let empColumnValues = [];

  console.log(`

============= Add an Employee   =============

`);
  return inquirer
    .prompt([
      // ** Get New Employee's FIRST Name **
      {
        type: 'input',
        name: 'first',
        message: "What is the employee's FIRST Name? (Required)",
        validate: firstInput => {
          if (firstInput) {
            return true;
          } else {
            console.log('Please enter their First Name');
            return false;
          }
        }
      },
      // ** Get New Employee's LAST Name **
      {
        type: 'input',
        name: 'last',
        message: "What is the employee's LAST Name? (Required)",
        validate: lastInput => {
          if (lastInput) {
            return true;
          } else {
            console.log('Please enter their Last Name');
            return false;
          }
        }
      }
    ])
    //  ** Create Role [] for Inq Prompt Answer Choices
    .then(answer => {
      //  ** Concat Empl Name for Summary Confirm Console.log & push to []
      let first = answer.first;
      let last = answer.last;
      let newEmp = first.concat(" ", last)
      empColumnValues.push(answer.first, answer.last);

      //  ** Get Role Titles/Ids  **
      dbConnect.query(`SELECT
      id,
      title
      FROM role`, (err, results) => {
        if (err) throw err;

        //  ** Map [] as choice for inq.prompt  **
        const roleChoices = results.map(({ title, id }) => ({ name: title, value: id }));

        inquirer.prompt([
          {
            type: 'list',
            name: 'roleForEmp',
            message: "What Role does the Employee hold? (Required)",
            choices: roleChoices
          }
        ])
          .then(answer => {
            const roleAnswer = answer.roleForEmp;
            empColumnValues.push(roleAnswer)


            //  ** Get Manager Info  **
            dbConnect.query(`SELECT
            id,
            first_name,
            last_name
            FROM employees`, (err, results) => {
              if (err) throw err;

              //  ** Map [] as choice for inq.prompt  **
              const manChoices = results.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

              inquirer.prompt([
                {
                  type: 'confirm',
                  name: 'confirmAddMan',
                  message: 'Would you like to enter their Manager?',
                  default: true,
                },
                {
                  type: 'list',
                  name: 'manForEmp',
                  message: "Who is the Employees Manager (Required)",
                  choices: manChoices,
                  when: ({ confirmAddMan }) => confirmAddMan
                }
              ])
                .then(answer => {
                  const manAnswer = answer.manForEmp;
                  empColumnValues.push(manAnswer)


                  //  ** Take User's Answer & match to man id then put into manager_id column of final Insert Into emp query
                  var addEmpQuery = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

                  dbConnect.query(addEmpQuery, empColumnValues, (err, result) => {
                    if (err) throw err;
                    console.log(`

--------------------------  You Added a New Employee: ${newEmp} --------------------------

`);
                    viewEmployees(cb);
                  });
                });
            });
          });
      });
    });
};
// ================ ADD EMPLOYEE ENDS ================















module.exports =
{
  addDeptPrompt,
  addRolePrompt,
  addEmpPrompt
}