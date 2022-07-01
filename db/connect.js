const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'BootCamp45',
        database: 'workbase'
    },
    console.log('connected to workbase')
)

module.exports = db;