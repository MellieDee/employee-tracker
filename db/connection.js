/* eslint-disable */

// **********    Set dependencies    ******
const mysql = require('mysql2');


// **********    Connect to db    *********
const dbConnect = mysql.createConnection(
  {
    host: 'localhost',
    // mySQL username,
    user: 'mdd',
    // mySQL pw
    password: 'Dq5H95E9t',
    database: 'employee_db'
  },
  console.log('Connected to employee_db')
);

//    ****   catch error to not crach app    ****
dbConnect.connect(function (err) {
  if (err) throw err;
})


module.exports = dbConnect;