const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretfloristkey';

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const [admins] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
        if (admins.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = admins[0];
        const isMatch = await bcrypt.compare(password, admin.password_hash);
        
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, username: admin.username });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/me', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        res.json({ username: decoded.username });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

module.exports = router;
