const db = require('../db/connection');
const inquirer = require('inquirer');

const employQuestions = [
    {
        type: 'list',
        name: 'employList',
        message: 'What would you like to do?',
        choices: ['View Employees', 'View by Manager', 'View by Department', 'Add Employee', 'Update Employee', 'Delete Employee',  'Go Back'],
        default: 'View Employees'
    },
    {
        type: 'rawlist',
        name: 'viewByManager',
        message: 'Which manager do you want to see the Employees for?',
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = [];
            let sql = `SELECT * FROM employees`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }
                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ value: {id: res[i].id, full_name: res[i].first_name + ' ' + res[i].last_name}, name:res[i].first_name + ' ' + res[i].last_name});
                    }
                    return resolve(choicesArr);
                })
            })
        },
        when: ({employList}) => {
            if (employList === 'View by Manager') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'viewByDepartment',
        message: 'Which Department do you want to see the Employees for?',
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = [];
            let sql = `SELECT * FROM departments`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }
                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ value: {id:res[i].id, name: res[i].name}, name:res[i].name});
                    }
                    return resolve(choicesArr);
                });
                
            });
        },
        when: ({employList}) => {
            if (employList === 'View by Department') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addEmployFirstName',
        message: "What is the Employee's First Name?",
        when: ({ employList }) => {
            if (employList === 'Add Employee') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addEmployLastName',
        message: "What is the Employee's Last Name?",
        when: ({ employList }) => {
            if (employList === 'Add Employee') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'addEmployRole',
        message: "What is the Employee's Role?",
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = [];
            let sql = `SELECT * FROM roles`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }
                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ name: res[i].title, value:{id: res[i].id, title:res[i].title}});
                    }
                    return resolve(choicesArr);
                })
                
            })
        },
        when: ({ employList }) => {
            if (employList === 'Add Employee') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'addEmployManager',
        message: "Who is this Employee's Manager?",
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = ['NULL'];
            let sql = `SELECT * FROM employees`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }
                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ value: {id: res[i].id, full_name: res[i].first_name + ' ' + res[i].last_name}, name:res[i].first_name + ' ' + res[i].last_name});
                    }
                    return resolve(choicesArr);
                })
                
            })
        },
        when: ({ employList }) => {
            if (employList === 'Add Employee') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'updateEmployee',
        message: 'Which Employee would you like to update?',
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = [];
            let sql = `SELECT * FROM employees`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }
                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ value: {id: res[i].id, first_name: res[i].first_name, last_name: res[i].last_name, role_id: res[i].role_id, manager_id: res[i].manager_id}, name:res[i].first_name + ' ' + res[i].last_name});
                    }
                    return resolve(choicesArr);
                })
                
            })
        },
        when:({ employList }) => {
            if (employList === "Update Employee") {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'updateEmployChoice',
        message: 'What did you want to update?',
        choices: [`Employee First Name`, `Employee Last Name`, 'Employee Role', 'Employee Manager', 'Go Back'],
        when: ({updateEmployee}) => {
            if (updateEmployee) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'updateEmployFirstName',
        message: 'What should the First Name be?',
        default:  ({ updateEmployee }) => {
            if (updateEmployee) {
                return updateEmployee.first_name;
            } else {
                return ' ';
            }
        },
        when: ({ updateEmployChoice }) => {
            if (updateEmployChoice === `Employee First Name`) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'updateEmployLastName',
        message: "What should the Last Name be?",
        default:  ({ updateEmployee }) => {
            if (updateEmployee) {
                return updateEmployee.last_name;
            } else {
                return ' ';
            }
        },
        when: ({ updateEmployChoice }) => {
            if (updateEmployChoice === `Employee Last Name`) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'updateEmployRole',
        message: 'What Roll should this employee fill?',
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = [];
            let sql = `SELECT * FROM roles`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }
                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ value: {id:res[i].id, title: res[i].title}, name: res[i].title});
                    }
                    return resolve(choicesArr);
                })
                
            })
        },
        when: ({ updateEmployChoice }) => {
            if (updateEmployChoice === 'Employee Role') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'updateEmployManager',
        message: 'What Manager should this employee be under?',
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = [];
            let sql = `SELECT * FROM employees`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }
                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ value: {id: res[i].id, first_name: res[i].first_name, last_name: res[i].last_name, role_id: res[i].role_id, manager_id: res[i].manager_id}, name:res[i].first_name + ' ' + res[i].last_name});
                    }
                    return resolve(choicesArr);
                })
                
            })
        },
        when: ({ updateEmployChoice }) => {
            if (updateEmployChoice === 'Employee Manager') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'deleteEmployee',
        message: 'Which Employee would you like to DELETE?',
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = [];
            let sql = `SELECT * FROM employees`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }
                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ value: {id: res[i].id, first_name: res[i].first_name, last_name: res[i].last_name}, name:res[i].first_name + ' ' + res[i].last_name});
                    }
                    choicesArr.push('Go Back');
                    return resolve(choicesArr);
                })
                
            })
        },
        when:({ employList }) => {
            if (employList === "Delete Employee") {
                return true;
            } else {
                return false;
            }
        }
    }

];

module.exports = {employQuestions};