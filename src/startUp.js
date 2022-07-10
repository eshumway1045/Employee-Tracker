const db = require('../db/connection');
const inquirer = require ('inquirer');

const startUp = [
    {
        type: 'rawlist',
        name: 'startup',
        message: 'What would you like to See?',
        choices: ['Employee Menu', 'Role Menu',  'Department Menu', 'Exit'],
        default: 'Exit'
        }
];
module.exports = {
    startUp
};