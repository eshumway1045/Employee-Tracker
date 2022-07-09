const db = require('../db/connection');
const inquirer = require ('inquirer');

const startUp = [
    {
    type: 'rawlist',
    name: 'startup',
    message: 'Please select what menu you would like to view?',
    choices: ['Department Menu', 'Role Menu', 'Employee Menu', 'Exit'],
    default: 'Exit'
    }
];
module.exports = {
    startUp
};