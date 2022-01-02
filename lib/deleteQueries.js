//  **** Dependencies    ****
const dbConnect = require('../db/connection');
require('console.table');


//=========    Functions for DELETING Data  =========

//============== DELETE Departments SQL Query ============


function deleteDept() {

const deptQuery = `SELECT 
dept_id AS ID,  
dept_name AS Name
FROM department`

dbConnect.promise().query(deptQuery)
  .then(([rows]) => {
    console.table(rows)
  })
  .catch(err => {
  console.log(err);
   })
.then( () => dbConnect.end())

};


module.exports = 
{
  deleteDept
}