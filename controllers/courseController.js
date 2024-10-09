const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllCourse = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT course_id, course_name, course_code, user_id, dept_id created_at, updated_at FROM courses');
        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getCourseById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [rows] = await pool.query('SELECT course_name, course_code, user_id, dept_id created_at, updated_at FROM courses WHERE course_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Dai ka man baga enrolled, weyy.' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createCourse = async (req, res) => {
    const {  course_name, course_code, user_id, dept_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO courses ( course_name, course_code, user_id, dept_id) VALUES (?, ?, ?, ? )', [ course_name, course_code, user_id, dept_id]);
        res.status(201).json({ course_id: result.insertId, course_name, course_code, user_id, dept_id});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const {  course_name, course_code } = req.body;

    try {
        const [result] = await pool.query('UPDATE courses SET course_name = ?, course_code = ? WHERE course_id = ?', [course_name, course_code, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Your course is not found.' });
        }

        res.json({ message: 'Your course has been successfully updated.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM courses WHERE course_id = ?', [id]);

        if (result.affect6edRows === 0) {
            return res.status(404).json({ error: 'Your course is not found.'});
        }

        res.json({ message: 'The course had been effectively eliminated.'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
    
module.exports = { getAllCourse, getCourseById, createCourse, updateCourse, deleteCourse };

