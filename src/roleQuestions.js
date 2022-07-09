const db = require('../db/connection');
const inquirer = require ('inquirer');

const roleQuestions = [
    {
        type: 'list',
        name: 'roleList',
        message: 'What would you like to do?',
        choices: ['View Roles', 'Add a Role', 'Update a Role', 'Delete a Role', 'Go Back'],
        default: 'View all Roles'
    },
    {
        type: 'input',
        name: 'addTitle',
        message: "What would you like the role to be called?",
        when: ({ roleList }) => {
            if (roleList === 'Add a Role') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'number',
        name: 'addSalary',
        message: "What is the salary of this role?",
        when: ({ roleList }) => {
            if (roleList === 'Add a Role') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'addDepartment',
        message: "What is the Department does this role belong to?",
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
        when: ({ roleList }) => {
            if (roleList === 'Add a Role') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'update',
        message: 'Which Role would you like to modify',
        choices: () => {
            return new Promise ((resolve, reject) => {
            let choicesArr = [];
            let sql = `SELECT * FROM roles`;
            db.query(sql, (err, res) => {
                if (err) {
                    return reject(err);
                }
                    for (let i = 0 ; i < res.length ; i++ ) {
                        choicesArr.push({ value: {id: res[i].id, title: res[i].title, salary: res[i].salary, department_id: res[i].department_id}, name:res[i].title});
                    }
                    return resolve(choicesArr);
                })
                
            })
        },
        when:({ roleList }) => {
            if (roleList === "Update a Role") {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'updateChoice',
        message: 'What did you want to update?',
        choices: ['Title', 'Salary', 'Department'],
        when: ({updateRole}) => {
            if (updateRole) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'updateTitle',
        message: 'What should the new Title be?',
        default:  ({ updateRole }) => {
            if (updateRole.title) {
                return updateRole.title;
            } else {
                return ' ';
            }
        },
        when: ({ updateRoleChoice }) => {
            if (updateRoleChoice === 'Role Title') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'number',
        name: 'updateSalary',
        message: "What should the new Salary be?",
        default: ({updateRole}) => {
           if (updateRole.salary) {
               return updateRole.salary;
           } else {
               return ' ';
           }
        },
        when: ({ updateRoleChoice }) => {
            if (updateRoleChoice === 'Role Salary') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'updateDepartment',
        message: 'What Department should this Role belong to?',
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
                })
                
            })
        },
        when: ({ updateRoleChoice }) => {
            if (updateRoleChoice === 'Role Department') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'delete',
        message: 'Which Role would you like to REMOVE?',
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
                    choicesArr.push('Go Back');
                    return resolve(choicesArr);
                })
                
            })
        },
        when:({ roleList }) => {
            if (roleList === "Delete a Role") {
                return true;
            } else {
                return false;
            }
        }
    }
];

module.exports = {
    roleQuestions
};