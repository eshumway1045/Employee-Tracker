const inquirer = require('inquirer');
const table = require('console.table');
const fetch = require('node-fetch');
const { startUp } = require('./src/startUp');
const { deptQuestions } = require('./src/deptQuestions');
const { roleQuestions } = require('./src/roleQuestions');
const { employQuestions: eQues } = require('./src/employQuestions');


class Build {

    begin() {
        console.clear();
        inquirer.prompt(startUp)
            .then(responses => {
                console.log(responses.startup);


                if (responses.startup === 'Employee Menu') {
                    this.menuEmploy();
                }
                if (responses.startup === 'Role Menu') {
                    this.menuRole();
                }
                if (responses.startup === 'Department Menu') {
                    this.menuDepartment();
                }
                if (responses.startup === "Exit") {
                    process.exit();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    menuEmploy() {
        inquirer.prompt(eQues)
            .then((responses) => {
                console.log(responses);
                if (responses.employList === "Go Back") {
                    this.begin();
                }
                if (responses.employList === "View Employees") {
                    fetch('http://localhost:3001/api/employees', {
                        method: 'GET'
                    })
                        .then((res) => res.json())
                        .then((data) => { console.clear(); console.log('\n\n '); console.table(data.data) })
                        .then(this.menuEmploy());

                }
                if (responses.employList === "View by Manager") {
                    fetch(`http://localhost:3001/api/manager/${responses.viewByManager.id}`, {
                        method: 'GET'
                    })
                        .then((res) => res.json())
                        .then((data) => { console.clear(); console.log('\n\n '); console.table(data.data) })
                        .then(this.menuEmploy());
                }
                if (responses.employList === "View by Department") {
                    fetch(`http://localhost:3001/api/deptEmployees/${responses.viewByDepartment.id}`, {
                        method: 'GET'
                    })
                        .then((res) => res.json())
                        .then((data) => { console.clear(); console.log('\n\n '); console.table(data.data) })
                        .then(this.menuEmploy());
                }
                if (responses.employList === "Add Employee") {
                    if (!responses.addEmployFirstName || !responses.addEmployLastName || !responses.addEmployRole || !responses.addEmployManager) {
                        return;
                    }
                    const add = (employee) =>
                        fetch(`http://localhost:3001/api/employee`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(employee),
                        })
                            .then(this.menuEmploy());
                    const newEmplObj = {
                        first_name: responses.addEmployFirstName,
                        last_name: responses.addEmployLastName,
                        role_id: responses.addEmployRole.id,
                        manager_id: responses.addEmployManager.id
                    }
                    add(newEmplObj);
                }
                if (responses.employList === "Delete Employee") {
                    fetch(`http://localhost:3001/api/employee/${responses.deleteEmployee.id}`, {
                        method: 'Delete'
                    })
                        .then(this.menuEmploy());
                }
                if (responses.employList === "Update Employee") {
                    let updateMeEmpl = (updateText) => fetch(`http://localhost:3001/api/employee/${responses.updateEmployee.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify(updateText),
                    })
                        .then(this.menuEmploy());
                    let roleID = () => {
                        if (responses.updateEmployRole) {
                            return responses.updateEmployRole.id;
                        } else {
                            return responses.updateEmployee.role_id;
                        }
                    };
                    let manID = () => {
                        if (responses.updateEmployManager) {
                            return responses.updateEmployManager.id;
                        } else {
                            return responses.updateEmployee.manager_id;
                        }
                    };
                    let updateEmployObject = {
                        first_name: responses.updateEmployFirstName || responses.updateEmployee.first_name,
                        last_name: responses.updateEmployLastName || responses.updateEmployee.last_name,
                        role_id: roleID(),
                        manager_id: manID()
                    };
                    console.clear();
                    console.log('\n\nEmployee was updated to the following:');
                    console.table(updateEmployObject);
                    updateMeEmpl(updateEmployObject);
                }
            });
    };

    menuRole() {
        inquirer.prompt(roleQuestions)
            .then(responses => {
                console.log(responses);
                if (responses.roleList === "Go Back") {
                    this.begin();
                }
                if (responses.roleList === "View Roles") {
                    fetch('http://localhost:3001/api/roles', {
                        method: 'GET'
                    })
                        .then((res) => res.json())
                        .then((data) => { console.clear(); console.log('\n\n'); console.table(data.data) })
                        .then(this.menuRole());
                }
                if (responses.roleList === "Add Role") {
                    if (!responses.addTitle || !responses.addSalary || !responses.addDepartment) {
                        return;
                    }
                    const addMeRole = (role) =>
                        fetch(`http://localhost:3001/api/role`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(role),
                        })
                            .then(this.menuRole());
                    const newRoleObj = {
                        title: responses.addTitle,
                        salary: responses.addSalary,
                        department_id: responses.addDepartment.id
                    }
                    addMeRole(newRoleObj);
                }

                if (responses.roleList === "Update Role") {
                    let updateMeRole = (updateText) => fetch(`http://localhost:3001/api/role/${responses.updateRole.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify(updateText),
                    })
                        .then(this.menuRole());
                    let updateRoleObject = {
                        title: responses.updateTitle || responses.updateRole.title,
                        salary: responses.updateSalary || responses.updateRole.salary,
                        department_id: responses.updateDepartment || responses.updateRole.department_id
                    };
                    console.clear();
                    console.log('\n\nRole updated to the following:');
                    console.table(updateRoleObject);
                    updateMeRole(updateRoleObject);
                }
                if (responses.roleList === "Delete Role") {
                    fetch(`http://localhost:3001/api/role/${responses.deleteRole.id}`, {
                        method: 'Delete'
                    })
                        .then(this.menuRole());
                }
            })
    };

    menuDepartment() {
        inquirer.prompt(deptQuestions)
            .then(responses => {
                console.log(responses);
                if (responses.departmentList === "Go Back") {
                    this.begin();
                }
                if (responses.departmentList === "View Departments") {
                    fetch('http://localhost:3001/api/departments', {
                        method: 'GET'
                    })
                        .then((res) => res.json())
                        .then((data) => { console.clear(); console.log('\n\n '); console.table(data.data) })
                        .then(this.menuDepartment());

                }
                if (responses.departmentList === "View Salary Budget") {
                    fetch(`http://localhost:3001/api/deptSalaries/${responses.viewSalary.id}`, {
                        method: 'GET'
                    })
                        .then((res) => res.json())
                        .then((data) => { console.clear(); console.log('\n\n '); console.table(data.data) })
                        .then(this.menuDepartment());
                }
                if (responses.departmentList === "Add Department") {
                    if (!responses.addDepartment) {
                        return;
                    }

                    const add = (department) =>
                        fetch(`http://localhost:3001/api/department`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(department),
                        })
                            .then(this.menuDepartment());
                    const newDepartmentObject = {
                        name: responses.addDepartment
                    }
                    add(newDepartmentObject);
                }
                if (responses.departmentList === "Delete Department") {
                    fetch(`http://localhost:3001/api/department/${responses.deleteDepartment.id}`, {
                        method: 'Delete'
                    })
                        .then(this.menuDepartment());
                }
                if (responses.departmentList === "Update Department") {
                    let updateMe = (updateText) => fetch(`http://localhost:3001/api/department/${responses.updateDepartment.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': "application/json"
                        },
                        body: JSON.stringify(updateText),
                    })
                        .then(this.menuDepartment());
                    let updateDepartmentObject = {
                        name: responses.yesUpdateDepartment
                    }
                    updateMe(updateDepartmentObject);

                }
            })
            .catch(err => {
                console.log(err);
            })
    };


}


module.exports = Build;