//   **********    Dependencies    *********

const dbConnect = require('../db/connection');
require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, viewOneEmp } = require('./viewQueries')
const cTable = require('console.table');




//  =========== UPDATE Employee ROLE  =========

function updateEmpPrompt() {
  // sql prompt to get [] of employee column names 


  // the, iQP to pick a role
  //then sql to update emplyees SET role where id - selected empl id
  //console.table results
  console.log(`

========================= Change an Employee's Role   =========================


---------------------------    Table of Current Employees     ---------------------------
`);
  viewEmployees();

  dbConnect.query(`SELECT
id,
first_name,
last_name
FROM employees`, (err, results) => {
    if (err) throw err;

    //  ** Map [] as choice for inq.prompt  **
    const empChoices = results.map(({ id, first_name, last_name }) => ({ name: "Name: " + first_name + " " + last_name + " " + "  Employee ID: " + id, value: id }));

    //  ** Ask user for Emp Name  **
    inquirer.prompt([
      {
        type: 'list',
        name: 'updateEmp',
        message: "What Employee record would you like to update?(Required)",
        choices: empChoices,
      }
    ])
      .then(answer => {
        let emp = answer.updateEmp
        const updateValues = [emp];

        //  ** Get Role Titles/Ids & Push to updateEmp[]  **
        dbConnect.query(`SELECT
        id,
        title
        FROM role`, (err, results) => {
          if (err) throw err;

        //  ** Map [] as choice for inq.prompt  **
        const roleChoices = results.map(({ id, title }) => ({ name: title, value: id }));

          inquirer.prompt([
            {
              type: 'list',
              name: 'roleForEmp',
              message: "What is the Employee's new title? (Required)",
              choices: roleChoices
            }
          ])
            .then(answer => {
              let title = answer.roleForEmp
              // let updatedEmp = first.concat(" ",last)
              updateValues.push(title);
              // console.log(title)
              // console.log(updateValues)

      
              updateValues[0] = title
              updateValues[1] = emp

              // console.log(updateValues)


           //** Take User's Answer & match to role id then put into role_id column of employees Into role query
          const updateEmpQuery = `UPDATE employees SET role_id = ? WHERE id = ?`;

          dbConnect.promise().query(updateEmpQuery, updateValues)
          .then(data => {
            viewEmployees();
              })
              .catch(console.log)
            })
        })
      });
  });
}


// 


// console.log(emp)
// const empToUpdate = emp.updateEmp;
// empColumnValues.push(empToUpdate)


// dbConnect.query(UPDATE viewEmployees
// SET role_id = ${idfrom iQrole}
// WHERE id = idfrom empIQ)





module.exports =
{
  updateEmpPrompt
}







//   ***********   DRAFT CODE   ***********


              ///alt ways to switch order/?
              // Delete 'title' from index 1
              // start at index 1, remove 1 item
              // returns ["title"]
              // updateValues.splice(1, 1);
              
              // // updateValues [] no longer has 'title' in it
              // // returns ["emp"]
              // console.log(updateValues.slice());
              
              // // Add 'title' to index 0
              // // start at index 0, remove 0 items, add 'title'
              // // returns []
              // updateValues.splice(0, 0, 'title');
              
              // // updateValues [] now has 'title' in [0]
              // // returns ["title", "emp"]
              // console.log(updateValues.slice());

