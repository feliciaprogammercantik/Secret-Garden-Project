const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Name, email, and message are required' });
        }

        const [result] = await pool.query(
            'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
            [name, email, phone || null, message]
        );

        res.status(201).json({
            id: result.insertId,
            message: 'Message sent successfully!'
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM contacts ORDER BY created_at DESC'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM contacts WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Message not found' });

        res.json({ message: 'Message deleted' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ error: 'Failed to delete message' });
    }
});

module.exports = router;
