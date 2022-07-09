const db = require('../db/connection');
const inquirer = require ('inquirer');

const deptQuestions = [
    {
        type: 'list',
        name: 'departmentList',
        message: 'What would you like to do?',
        choices: ['View All Departments', 'View Salary Budget', 'Add Department', 'Update Department', 'Delete Department', 'Go Back'],
        default: 'View All Departments'
    },
    {
        type: 'rawlist',
        name: 'viewSalary',
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
            if (departmentList === "View  Salary Budget") {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addDepartment',
        message: "What is the Name of the Department you would like to add?",
        when: ({ DepartmentList }) => {
            if (DepartmentList === 'Add a Department') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'updateDepartment',
        message: 'What is the name of the Department would you like to update',
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
        when:({ DepartmentList }) => {
            if (DepartmentList === "Update a Department") {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'yesUpdateDepartment',
        message: 'What would you like to change the name of the Department to be?',
        default: ({ updateDepartment }) => {
            return updateDepartment.name || " ";
        },
        when: ({updateDepartment}) => {
            if (updateDepartment) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'deleteDepartment',
        message: 'What Department would you like to Remove?',
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
        when:({ DepartmentList }) => {
            if (DepartmentList === "Delete a Department") {
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