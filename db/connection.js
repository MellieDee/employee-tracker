// const { optionPrompt } = require('../index')

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


//    ****   catch error to not crash app    ****
dbConnect.connect(function (err) {
  if (err) throw err;
  // optionPrompt();
});


module.exports = dbConnect;