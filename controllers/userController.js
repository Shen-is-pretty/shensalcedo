const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT user_id, firstname, lastname, username, created_at, updated_at FROM users');
        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const [rows] = await pool.query('SELECT user_id, firstname, lastname, username, created_at, updated_at FROM users WHERE user_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUser = async (req, res) => {
    const { firstname, lastname, username, passwords } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(passwords, 10);
        const [result] = await pool.query('INSERT INTO users (firstname, lastname, username, passwords) VALUES (?, ?, ?, ?)', [firstname, lastname, username, hashedPassword]);
        res.status(201).json({ id: result.insertId, firstname, lastname, username, passwords});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, username, passwords } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(passwords, 10);
        const [result] = await pool.query('UPDATE users SET firstname = ?, lastname = ?, username = ?, passwords = ? WHERE user_id = ?', [firstname, lastname, username, hashedPassword, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);

        if (result.affect6edRows === 0) {
            return res.status(404).json({ error: 'User not found'});
        }

        res.json({ message: 'The user had been removed successfully.'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
    
module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };