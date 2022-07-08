const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/role/:id', (req, res) => {
    const sql = `SELECT * FROM roles
    WHERE roles.id = ?`;
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

router.delete('/role/:id', (req,res) => {
    const sql = `DELETE FROM roles 
    WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'role not found'
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

router.put('/role/:id', (req, res) => {
    const sql = `UPDATE roles 
    SET title = ? , salary = ?, department_id = ?
    WHERE id = ?`;
    const params = [req.body.title, req.body.salary, req.body.department_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'role not found'
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

router.post('/role', ({ body }, res) => {
    const sql = `INSERT INTO roles (title, salary, department_id)
        VALUES (?,?,?)`;
    const params = [body.title, body.salary, body.department_id];

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

router.get('/roles', (req, res) => {
    const sql = `SELECT roles.title, roles.id AS Role_id, departments.name AS Department, roles.salary AS Role_Salary
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;

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