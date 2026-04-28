const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const { category_id, featured } = req.query;
        let query = `
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
    `;
        const conditions = [];
        const params = [];

        if (category_id) {
            conditions.push('p.category_id = ?');
            params.push(category_id);
        }
        if (featured === 'true') {
            conditions.push('p.is_featured = 1');
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY p.created_at DESC';

        const [rows] = await pool.query(query, params);
        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT p.*, c.name as category_name 
       FROM products p 
       LEFT JOIN categories c ON p.category_id = c.id 
       WHERE p.id = ?`,
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, description, price, image_url, category_id, is_featured } = req.body;

        if (!name || !price || !category_id || !image_url) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const [result] = await pool.query(
            'INSERT INTO products (name, description, price, image_url, category_id, is_featured) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, price, image_url, category_id, is_featured ? 1 : 0]
        );

        res.status(201).json({ id: result.insertId, message: 'Product created' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { name, description, price, image_url, category_id, is_featured } = req.body;

        if (!name || !price || !category_id || !image_url) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const [result] = await pool.query(
            'UPDATE products SET name = ?, description = ?, price = ?, image_url = ?, category_id = ?, is_featured = ? WHERE id = ?',
            [name, description, price, image_url, category_id, is_featured ? 1 : 0, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product updated' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = router;
