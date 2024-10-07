const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllDept = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT dept_name, dept_code, user_id, created_at, updated_at FROM departments');
        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDeptById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [rows] = await pool.query('SELECT dept_name, dept_code, user_id, created_at, updated_at FROM departments WHERE dept_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Nasain man department mo?' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createDept = async (req, res) => {
    const {  dept_name, dept_code, user_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO departments ( dept_name, dept_code, user_id) VALUES (?, ?, ?)', [ dept_name, dept_code, user_id]);
        res.status(201).json({ id: result.insertId, dept_name, dept_code, user_id});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateDept = async (req, res) => {
    const { id } = req.params;
    const {  dept_name, dept_code } = req.body;

    try {
        const [result] = await pool.query('UPDATE departments SET dept_name = ?, dept_code = ?  WHERE dept_id = ?', [dept_name, dept_code, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Sari man department mo?' });
        }

        res.json({ message: 'Your department has been successfully updated.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteDept = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM departments WHERE dept_id = ?', [id]);

        if (result.affect6edRows === 0) {
            return res.status(404).json({ error: 'Sari man department mo?'});
        }

        res.json({ message: 'The department had been effectively eliminated.'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
    
module.exports = { getAllDept, getDeptById, createDept, updateDept, deleteDept };