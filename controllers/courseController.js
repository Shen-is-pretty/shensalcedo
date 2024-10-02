const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllCourse = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT course_id, course_name, course_code, user_id, dept_id created_at, updated_at FROM departments');
        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCourseById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [rows] = await pool.query('SELECT course_name, course_code, user_id, dept_id created_at, updated_at FROM departments WHERE course_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Dai ka man baga enrolled, weyy.' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};