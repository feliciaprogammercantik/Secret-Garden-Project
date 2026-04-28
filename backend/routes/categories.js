const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM categories ORDER BY name ASC'
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, image_url } = req.body;
        if (!name) return res.status(400).json({ error: 'Name is required' });

        const [result] = await pool.query(
            'INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)',
            [name, description, image_url]
        );
        res.status(201).json({ id: result.insertId, message: 'Category created' });
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, description, image_url } = req.body;
        if (!name) return res.status(400).json({ error: 'Name is required' });

        const [result] = await pool.query(
            'UPDATE categories SET name = ?, description = ?, image_url = ? WHERE id = ?',
            [name, description, image_url, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Category not found' });

        res.json({ message: 'Category updated' });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
});
    
router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Category not found' });

        res.json({ message: 'Category deleted' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

module.exports = router;
