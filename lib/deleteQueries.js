// //  **** Dependencies    ****
// const dbConnect = require('../db/connection');
// const inquirer = require('inquirer');
// const { viewDepartments, preViewDept } = require('./viewQueries');



// //============== DELETE a Department ================

// const deleteDeptPrompt = (cb) => {
//   console.log(`
//   ================================ Delete a Department   ============================
//   `)

//   dbConnect.query(`SELECT
//   dept_id,
//   dept_name
//   FROM department`, (err, results) => {
//     if (err) throw err;

//     //  ** Map [] as choice for inq.prompt  **
//     const deptChoices = results.map(({ dept_id, dept_name }) => ({ name: dept_name, value: dept_id }));


//     //  ** Ask user to pick Department using sql prompt 
//     return inquirer.prompt([
//       {
//         type: 'list',
//         name: 'deptToDel',
//         message: "What Department would you like to delete?(Required)",
//         choices: deptChoices,
//       }
//     ])
//       .then(answer => {

//         let id = answer.deptToDel;

//         dbConnect.query(`DELETE FROM department WHERE dept_id = ?`, id, (err, result) => {
//           if (err) throw err;
//           console.log(`

//         ------ You Deleted Department: ${id}------

//           `);
//           viewDepartments(cb);
//         });
//       });
//   })
// }

// module.exports =
// {
//   deleteDeptPrompt
// }