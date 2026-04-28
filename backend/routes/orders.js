const express = require('express');
const router = express.Router();
const pool = require('../config/db');

const generateInvoiceCode = () => {
    const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();
    const dateStr = new Date().toISOString().slice(2, 7).replace('-', '');
    return `INV-SG-${dateStr}-${randomStr}`;
};

router.post('/', async (req, res) => {
    try {
        const { customer_name, customer_phone, total_amount, order_items } = req.body;

        if (!customer_name || !customer_phone || !total_amount) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const invoice_code = generateInvoiceCode();

        const [result] = await pool.query(
            `INSERT INTO orders (invoice_code, customer_name, customer_phone, total_amount, order_items, status) 
             VALUES (?, ?, ?, ?, ?, 'Pending Payment')`,
            [invoice_code, customer_name, customer_phone, total_amount, JSON.stringify(order_items)]
        );

        res.status(201).json({
            success: true,
            order_id: result.insertId,
            invoice_code,
            message: 'Order created successfully'
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

router.get('/track/:invoice_code', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT invoice_code, customer_name, total_amount, status, created_at, order_items 
             FROM orders WHERE invoice_code = ?`,
            [req.params.invoice_code]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error fetching order tracking info:', error);
        res.status(500).json({ error: 'Failed to track order' });
    }
});

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['Pending Payment', 'Paid', 'Processing', 'Delivered', 'Cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const [result] = await pool.query(
            'UPDATE orders SET status = ? WHERE id = ?',
            [status, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ success: true, message: 'Order status updated' });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
});

module.exports = router;
