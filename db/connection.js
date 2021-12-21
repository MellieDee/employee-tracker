// eslint-disable-next-line no-undef
const mysql = require('mysql2');


// Connect to db
const db = mysql.createConnection(
  {
    host: 'localhost',
    // mySQL username,
    user: 'root',
    // mySQL pw
    password: 'E9tH95Dq5',
    database: 'employee_db'
  },
  console.log('Connected to employee_db.')
);

// eslint-disable-next-line no-undef
module.exports = db;