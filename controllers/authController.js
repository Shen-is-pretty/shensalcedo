const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { firstname, lastname, username, passwords } = req.body;
     
    try {
        const hashedPassword = await bcrypt.hash(passwords, 10);
        const [rows] = await pool.query('INSERT INTO users (firstname, lastname, username, passwords) VALUES (?, ?, ?, ?)', [firstname, lastname, username, hashedPassword]);
    if (!firstname || !lastname || !username || !passwords){
        return res.status(400).json({error: 'Please provide all required fields'});     // Add error handling for empty fields or invalid data types  
        // Implement validation checks for username and passwords to ensure they meet the required criteria (e.g. length, complexity, etc.)  
        // For example, using a regular expression to validate the username and passwords.  
        // Implement a password hashing algorithm to securely store the passwords in the database.  
        // Use bcrypt.hash() to hash the passwords before storing them in the database.  
        // Implement JWT (JSON Web Tokens) for secure authentication and authorization.  
        // Use jwt.sign() to create a JWT token with the user's ID and username, and use jwt.verify() to validate the JWT token before allowing access to protected routes.  
        // Implement role-based access control (RBAC) to restrict access to certain routes based on the user's role.  
        // Implement rate
    }
        res.status(201).json({ message: 'You did it! You did it! Hooray! ' });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const login = async (req, res) => {
    const { username, passwords } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (rows.length === 0){
            return res.status(400).json({error: 'Invalid Credentials'});
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(passwords, user.passwords);
    
        if (!isMatch){
            return res.status(400).json({ error: 'Invalid Credentials'});
        }
        const token = jwt.sign({ user_id: user.user_id, username: user.username}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME});

        res.json({ token });

    } catch (err) {

        res.status(500).json({ error: err.message });
    }

};

module.exports = { register, login };