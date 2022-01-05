//   **********    Dependencies    *********
const dbConnect = require('../db/connection');
require('console.table');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { viewDepartments, viewRoles, viewEmployees, preViewEmp } = require('./viewQueries')
const cTable = require('console.table');




//  =========== UPDATE Employee ROLE  =========

const updateEmpPrompt = (cb) => {
  console.log(`

================================ Change an Employee's Role   ============================


----------------------------     Table of Current Employees    --------------------------
`);
  preViewEmp();
  dbConnect.query(`SELECT
id,
first_name,
last_name
FROM employees`, (err, results) => {
    if (err) throw err;

    //  ** Map [] as choice for inq.prompt  **
    const empChoices = results.map(({ id, first_name, last_name }) => ({ name: "Name: " + first_name + " " + last_name + " " + "  Employee ID: " + id, value: id }));



    //  ** Ask user to pick Emp Name using sql prompt 
    return inquirer.prompt([
      {
        type: 'list',
        name: 'updateEmp',
        message: "What Employee record would you like to update?(Required)",
        choices: empChoices,
      }
    ])
      .then(answer => {
        let emp = answer.updateEmp;
        const updateValues = [emp];

        //  ** Get Role Titles/Ids & Push to updateEmp[]  **
        dbConnect.query(`SELECT
        id,
        title
        FROM role`, (err, results) => {
          if (err) throw err;

          //  ** Map [] as choice for inq.prompt  **
          const roleChoices = results.map(({ id, title }) => ({ name: title, value: id }));


          //  ** Ask user to pick Emp new Role using sql prompt 
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
              updateValues.push(title);
              // console.log(title)
              // console.log(updateValues)

              updateValues[0] = title
              updateValues[1] = emp


              //** Take User's Answer & match to role id then put into role_id column of employees Into role query
              const updateEmpQuery = `UPDATE employees SET role_id = ? WHERE id = ?`;

              dbConnect.promise().query(updateEmpQuery, updateValues)
                .then(data => {
                  console.log(`  

---------------------   Changed Title for Employee with ID ${emp}     -----------------------
`)
                  viewEmployees(cb);
                })
                .catch(err => {
                  console.error(err);
                })
            })
        })
      });
  });
}
// ================ UPDATE Emp Role ENDS  ================



module.exports =
{
  updateEmpPrompt
}