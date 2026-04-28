const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT setting_key, setting_value FROM settings');
        const settings = {};
        rows.forEach(row => {
            settings[row.setting_key] = row.setting_value;
        });

        if (!settings['whatsapp_number']) {
            settings['whatsapp_number'] = '6285338001840';
        }
        res.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        res.status(500).json({ error: 'Failed to fetch settings' });
    }
});

router.get('/:key', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT setting_value FROM settings WHERE setting_key = ?', [req.params.key]);
        if (rows.length === 0) {
            if (req.params.key === 'whatsapp_number') return res.json({ value: '6285338001840' });
            return res.status(404).json({ error: 'Setting not found' });
        }
        res.json({ value: rows[0].setting_value });
    } catch (error) {
        console.error('Error fetching setting:', error);
        res.status(500).json({ error: 'Failed to fetch setting' });
    }
});

router.put('/', async (req, res) => {
    try {
        const settingsToUpdate = req.body;

        for (const [key, value] of Object.entries(settingsToUpdate)) {
            await pool.query(
                `INSERT INTO settings (setting_key, setting_value) 
                 VALUES (?, ?) 
                 ON DUPLICATE KEY UPDATE setting_value = ?`,
                [key, value, value]
            );
        }

        res.json({ success: true, message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ error: 'Failed to update settings' });
    }
});

module.exports = router;
