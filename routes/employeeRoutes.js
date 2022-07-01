const express = require('express');
const db = require('../db/connect');
const router = express.Router();

router.get('/deptEmployees/:id', (req, res) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS Role, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name, ' ', manager.
    last_name) AS Manager_Name
    FROM employees employee
    LEFT JOIN roles
    ON employee.role_id = roles.id
    LEFT JOIN departments
    on roles.department_id = departments.id
    LEFT JOIN employees manager
    ON employee.manager_id = manager.id
    WHERE department_id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ 
            message: 'success',
            data: rows
        });
    });
});

router.get('/manager/:id', (req, res) => {
    const sql =  `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS Full_Name, CONCAT(manager.first_name, ' ', manager.
    last_name) AS Manager_Name, roles.title AS Role
    FROM employees employee
    LEFT JOIN employees manager
    ON employee.manager_id = manager.id
    LEFT JOIN roles
    ON employee.role_id = roles.id
    WHERE manager.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

router.get('/employee/:id', (req, res) => {
    const sql =  `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS Full_Name, CONCAT(manager.first_name, ' ', manager.
    last_name) AS Manager_Name, roles.title AS Role
    FROM employees employee
    LEFT JOIN employees manager
    ON employee.manager_id = manager.id
    LEFT JOIN roles
    ON employee.role_id = roles.id
    WHERE employee.id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

router.delete('/employee/:id', (req,res) => {
    const sql = `DELETE FROM employees 
    WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'employee not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

router.put('/employee/:id', (req, res) => {
    const sql = `UPDATE employees 
    SET first_name = ?, last_name = ?, role_id = ?, manager_id = ?
    WHERE id = ?`;
    const params = [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});

router.post('/employee', ({ body }, res) => {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?)`;
    const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        }) ;
    });
});

router.get('/employees', (req, res) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS Role, departments.name AS Department, roles.salary AS Salary, CONCAT(manager.first_name, ' ', manager.
    last_name) AS Manager_Name
    FROM employees employee
    LEFT JOIN roles
    ON employee.role_id = roles.id
    LEFT JOIN departments
    on roles.department_id = departments.id
    LEFT JOIN employees manager
    ON employee.manager_id = manager.id
    `;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ 
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;