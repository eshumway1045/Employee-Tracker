const db = require('../db/connection');
const inquirer = require ('inquirer');

const deptQuestions = [
    {
        type: 'list',
        name: 'departmentList',
        message: 'What do you need?',
        choices: ['View Departments', 'View Salary Budget', 'Add Department', 'Update Department', 'Delete Department', 'Go Back'],
        default: 'View All Departments'
    },
    {
        type: 'rawlist',
        name: 'viewDeptSalary',
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = [];
            let sql = `SELECT * FROM departments`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }   

                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ value: {id: res[i].id, name: res[i].name}, name:res[i].name});
                    }
                    return resolve(choicesArr);
                })
                
            })
        },
        when:({ departmentList }) => {
            if (departmentList === "View Salary Budget") {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addDept',
        message: "What is the Department's Name?",
        when: ({ departmentList }) => {
            if (departmentList === 'Add Department') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'updateDept',
        message: 'Which Department would you like to update',
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = [];
            let sql = `SELECT * FROM departments`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }   

                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ value: {id: res[i].id, name: res[i].name}, name:res[i].name});
                    }
                    return resolve(choicesArr);
                })
                
            })
        },
        when:({ departmentList }) => {
            if (departmentList === "Update Department") {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'yesUpdateDept',
        message: 'What should the name of the Department be?',
        default: ({ updateDept }) => {
            return updateDept.name || " ";
        },
        when: ({updateDept}) => {
            if (updateDept) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'deleteDept',
        message: 'Which Department would you like to Remove?',
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = [];
            let sql = `SELECT * FROM departments`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }
                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ value: {id: res[i].id, name: res[i].name}, name:res[i].name});
                    }
                    choicesArr.push('Go Back');
                    console.log(choicesArr);
                    return resolve(choicesArr);
                })
                
            })
        },
        when:({ departmentList }) => {
            if (departmentList === "Delete Department") {
                return true;
            } else {
                return false;
            }
        }
    }
];

module.exports = {
    deptQuestions
};