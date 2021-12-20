const mysql = require('mysql2');


// Connect to db
const db = mysql.createConnection(
  {
    host: 'localhost',
    // your MySQL username,
    user: 'root',
    // your MySQL pw
    password: 'E9tH95Dq5',
    database: 'election'
  },
  console.log('Connected to the election db.')
);

module.exports = db;