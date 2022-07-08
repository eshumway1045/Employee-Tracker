const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'BootCamp45',
        database: 'taskforce'
    },
    console.log('connected to taskforce')
)

module.exports = db;