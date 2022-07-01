const db = require('../db/connect');
const inquirer = require ('inquirer');

const startQuestion = [
    {
    type: 'rawlist',
    name: 'startup',
    message: 'What would you like to do?',
    choices: ['Department Menu', 'Role Menu', 'Employee Menu', 'Quit'],
    default: 'Quit'
    }
];

const deptQuestions = [
    {
        type: 'list',
        name: 'deptList',
        message: 'What do you need?',
        choices: ['View All Departments', 'View Department Salary Budget', 'Add a Department', 'Update a Department', 'Delete a Department', 'Go Back'],
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
        when:({ deptList }) => {
            if (deptList === "View Department Salary Budget") {
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
        when: ({ deptList }) => {
            if (deptList === 'Add a Department') {
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
        when:({ deptList }) => {
            if (deptList === "Update a Department") {
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
        message: 'Which Department would you like to DELETE?',
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
        when:({ deptList }) => {
            if (deptList === "Delete a Department") {
                return true;
            } else {
                return false;
            }
        }
    }
];

const roleQuestions = [
    {
        type: 'list',
        name: 'roleList',
        message: 'What would you like to do?',
        choices: ['View all Roles', 'Add a Role', 'Update a Role', 'Delete a Role', 'Go Back'],
        default: 'View all Roles'
    },
    {
        type: 'input',
        name: 'addRoleTitle',
        message: "What is the role's Title?",
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
        name: 'addRoleSalary',
        message: "What is the role's Salary?",
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
        name: 'addRoleDept',
        message: "What is the Department for the role?",
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
        name: 'updateRole',
        message: 'Which role would you like to update',
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
        name: 'updateRoleChoice',
        message: 'What did you want to update?',
        choices: ['Role Title', 'Role Salary', 'Role Department'],
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
        name: 'updateRoleTitle',
        message: 'What should the Role Title be?',
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
        name: 'updateRoleSalary',
        message: "What should this role's Salary be?",
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
        name: 'updateRoleDept',
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
        name: 'deleteRole',
        message: 'Which Role would you like to DELETE?',
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

const emplQuestions = [
    {
        type: 'list',
        name: 'emplList',
        message: 'What would you like to do?',
        choices: ['View all Employees', 'View Employees by Manager', 'View Employees by Department', 'Add an Employee', 'Update an Employee', 'Delete an Employee',  'Go Back'],
        default: 'View all Employees'
    },
    {
        type: 'rawlist',
        name: 'viewByMan',
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
        when: ({emplList}) => {
            if (emplList === 'View Employees by Manager') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'viewByDept',
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
        when: ({emplList}) => {
            if (emplList === 'View Employees by Department') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addEmplFirstName',
        message: "What is the Employee's First Name?",
        when: ({ emplList }) => {
            if (emplList === 'Add an Employee') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'addEmplLastName',
        message: "What is the Employee's Last Name?",
        when: ({ emplList }) => {
            if (emplList === 'Add an Employee') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'addEmplRole',
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
        when: ({ emplList }) => {
            if (emplList === 'Add an Employee') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'addEmplManager',
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
        when: ({ emplList }) => {
            if (emplList === 'Add an Employee') {
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
        when:({ emplList }) => {
            if (emplList === "Update an Employee") {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'updateEmplChoice',
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
        name: 'updateEmplFirstName',
        message: 'What should the First Name be?',
        default:  ({ updateEmployee }) => {
            if (updateEmployee) {
                return updateEmployee.first_name;
            } else {
                return ' ';
            }
        },
        when: ({ updateEmplChoice }) => {
            if (updateEmplChoice === `Employee First Name`) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'updateEmplLastName',
        message: "What should the Last Name be?",
        default:  ({ updateEmployee }) => {
            if (updateEmployee) {
                return updateEmployee.last_name;
            } else {
                return ' ';
            }
        },
        when: ({ updateEmplChoice }) => {
            if (updateEmplChoice === `Employee Last Name`) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'updateEmplRole',
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
        when: ({ updateEmplChoice }) => {
            if (updateEmplChoice === 'Employee Role') {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'rawlist',
        name: 'updateEmplMan',
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
        when: ({ updateEmplChoice }) => {
            if (updateEmplChoice === 'Employee Manager') {
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
        when:({ emplList }) => {
            if (emplList === "Delete an Employee") {
                return true;
            } else {
                return false;
            }
        }
    }
];

module.exports = {
    startQuestion,
    deptQuestions,
    roleQuestions,
    emplQuestions
};