const db = require('../db/connection');
const inquirer = require('inquirer');

const employQuestions = [
    {
        type: 'list',
        name: 'employList',
        message: 'What would you like to do?',
        choices: ['View Employees', 'View employee by Manager', 'View Employee by Department', 'Add employee', 'Update employee', 'Remove Employee', 'Go Back'],
        default: 'Veiw Employees'
    },

    {
        type: 'rawlist',
        name: 'byManager',
        message: 'Which manager would you like to see the Employees of?',
        choices: () => {
            return new Promise((resolve, reject) => {
                let choicesArr = [];
                let sql = `SELECT * FROM employees`;
                db.query(sql, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    for (let i = 0; i < res.length; i++) {
                        choicesArr.push({ value: { id: res[i].id, full_name: res[i].first_name + ' ' + res[i].last_name }, name: res[i].first_name + ' ' + res[i].last_name });
                    }
                    return resolve(choicesArr);
                })
            })
        },
        when: ({ employList }) => {
            if (employList === 'View Employees by Manager') {
                return true;
            } else {
                return false;
            }
        }


    },
    {
        type: 'rawlist',
        name: 'byDepartment',
        message: 'Which Department would you like to see the Employees for?',
        choices: () => {
            return new Promise((resolve, reject) => {
                let choicesArr = [];
                let sql = `SELECT * FROM departments`;
                db.query(sql, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    for (let i = 0; i < res.length; i++) {
                        choicesArr.push({ value: { id: res[i].id, name: res[i].name }, name: res[i].name });
                    }
                    return resolve(choicesArr);
                });

            });
        },
        when: ({ employList }) => {
            if (employList === 'View Employees by Department') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'employFirstName',
        message: 'Enter Employees first name',
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
        name: 'employLastName',
        message: 'Enter Employees last name',
        when: ({ employList }) => {
            if (employList === 'Add Employee') {
                return true;
            }
            else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'addRole',
        message: 'What is the employees role?',
        choices: () => {
            return new Promise((resolve, reject) => {
                let choicesArr = [];
                let sql = `SELECT * FROM roles`;
                db.query(sql, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    for (let i = 0; i < res.length; i++) {
                        choicesArr.push({ name: res[i].title, value: { id: res[i].id, title: res[i].title } });
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
        name: 'addManager',
        message: "Who is this manager of this employee?",
        choices: () => {
            return new Promise((resolve, reject) => {
                let choicesArr = ['NULL'];
                let sql = `SELECT * FROM employees`;
                db.query(sql, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    for (let i = 0; i < res.length; i++) {
                        choicesArr.push({ value: { id: res[i].id, full_name: res[i].first_name + ' ' + res[i].last_name }, name: res[i].first_name + ' ' + res[i].last_name });
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
        name: 'updateEmploy',
        message: 'What employee do you want to update?',
        choices: () => {
            return new Promise((resolve, reject) => {
                let choicesArr = [];
                let sql = `SELECT * FROM employees`;
                db.query(sql, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    for (let i = 0; i < res.length; i++) {
                        choicesArr.push({ value: { id: res[i].id, first_name: res[i].first_name, last_name: res[i].last_name, role_id: res[i].role_id, manager_id: res[i].manager_id }, name: res[i].first_name + ' ' + res[i].last_name });
                    }
                    return resolve(choicesArr);
                })

            })
        },
        when: ({ employList }) => {
            if (employList === "Update Employee") {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'updateEmployInfo',
        message: 'What info would you like to update?',
        choices: [`First Name`, `Last Name`, 'Role', 'Manager', 'Go Back'],
        when: ({ updateEmployee }) => {
            if (updateEmployee) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'updateFirstName',
        message: 'What should the First Name be changed to?',
        default: ({ updateEmployee }) => {
            if (updateEmployee) {
                return updateEmployee.first_name;
            } else {
                return ' ';
            }
        },
        when: ({ updateEmplyInfo }) => {
            if (updateEmplyInfo === `Employee First Name`) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'updateLastName',
        message: "What should the Last Name be changed to?",
        default: ({ updateEmployee }) => {
            if (updateEmployee) {
                return updateEmployee.last_name;
            } else {
                return ' ';
            }
        },
        when: ({ updateEmplyInfo }) => {
            if (updateEmplyInfo === `Employee Last Name`) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'updateRole',
        message: 'What Role will the employee fill?',
        choices: () => {
            return new Promise((resolve, reject) => {
                let choicesArr = [];
                let sql = `SELECT * FROM roles`;
                db.query(sql, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    for (let i = 0; i < res.length; i++) {
                        choicesArr.push({ value: { id: res[i].id, title: res[i].title }, name: res[i].title });
                    }
                    return resolve(choicesArr);
                })

            })
        },
        when: ({ updateEmplyInfo }) => {
            if (updateEmplyInfo === 'Employee Role') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'updateManager',
        message: 'What Manager should this employee report to?',
        choices: () => {
            return new Promise((resolve, reject) => {
                let choicesArr = [];
                let sql = `SELECT * FROM employees`;
                db.query(sql, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    for (let i = 0; i < res.length; i++) {
                        choicesArr.push({ value: { id: res[i].id, first_name: res[i].first_name, last_name: res[i].last_name, role_id: res[i].role_id, manager_id: res[i].manager_id }, name: res[i].first_name + ' ' + res[i].last_name });
                    }
                    return resolve(choicesArr);
                })

            })
        },
        when: ({ updateEmplyInfo }) => {
            if (updateEmplyInfo === 'Employee Manager') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'removeEmployee',
        message: 'Who would you like to Remove?',
        choices: () => {
            return new Promise((resolve, reject) => {
                let choicesArr = [];
                let sql = `SELECT * FROM employees`;
                db.query(sql, (err, res) => {
                    if (err) {
                        return reject(err);
                    }
                    for (let i = 0; i < res.length; i++) {
                        choicesArr.push({ value: { id: res[i].id, first_name: res[i].first_name, last_name: res[i].last_name }, name: res[i].first_name + ' ' + res[i].last_name });
                    }
                    choicesArr.push('Go Back');
                    return resolve(choicesArr);
                })

            })
        },
        when: ({ employList }) => {
            if (employList === "Delete an Employee") {
                return true;
            } else {
                return false;
            }
        }
    }

];

module.exports = {employQuestions};