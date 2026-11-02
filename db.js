const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'subjectid',
    password: '1234',
    database: 'subjectdb'
});

module.exports = db;
