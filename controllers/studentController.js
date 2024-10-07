const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllStudent = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT student_name, course_id, user_id, created_at, updated_at FROM students');
        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getStudentById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [rows] = await pool.query('SELECT student_name, course_id, user_id, created_at, updated_at FROM students WHERE student_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Missing you, dear.' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createStudent = async (req, res) => {
    const {  student_name, course_id, user_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO students ( student_name, course_id, user_id) VALUES (?, ?, ?)', [ student_name, course_id, user_id]);
        res.status(201).json({ student_id: result.insertId, student_name, course_id, user_id});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const {  student_name } = req.body;

    try {
        const [result] = await pool.query('UPDATE students SET student_name = ?  WHERE student_id = ?', [student_name, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Missing.' });
        }

        res.json({ message: 'Successfully updated.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', [id]);

        if (result.affect6edRows === 0) {
            return res.status(404).json({ error: 'Waley man baga.'});
        }

        res.json({ message: 'The student had been evicted.'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
    
module.exports = { getAllStudent, getStudentById, createStudent, updateStudent, deleteStudent };