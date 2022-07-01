const express = require('express');
const db = require('../db/connect');
const router = express.Router();

router.get('/deptSalaries/:id', (req, res) => {
    const sql = `SELECT  departments.name AS Department, SUM(roles.salary) AS Department_budget
    FROM employees employee
    LEFT JOIN roles
    ON employee.role_id = roles.id
    LEFT JOIN departments
    on roles.department_id = departments.id
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

router.get('/department/:id', (req, res) => {
    const sql = `SELECT * FROM departments
                WHERE departments.id = ?`;
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

router.delete('/department/:id', (req,res) => {
    const sql = `DELETE FROM departments 
    WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'department not found'
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

router.put('/department/:id', (req, res) => {
    const sql = `UPDATE departments 
    SET name = ?
    WHERE id = ?`;
    const params = [req.body.name, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'department not found'
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

router.post('/department', ({ body }, res) => {
    const sql = `INSERT INTO departments (name)
        VALUES (?)`;
    const params = [body.name];

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

router.get('/departments', (req, res) => {
    const sql = `SELECT name AS Department, id AS Department_id FROM departments`;

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