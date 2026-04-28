const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// routes
const uploadRouter = require('./routes/upload');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const contactsRouter = require('./routes/contacts');
const ordersRouter = require('./routes/orders');
const settingsRouter = require('./routes/settings');
const authRouter = require('./routes/auth');

app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/settings', settingsRouter);

// test API
app.get('/api', (req, res) => {
    res.json({ message: 'Florist API is running 🌸' });
});


// ==============================
// ✅ SERVE FRONTEND (INI KUNCI)
// ==============================

// pastikan folder dist ada (hasil vite build)
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

// fallback ke index.html (untuk Vue Router)
app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});


// ==============================
// START SERVER
// ==============================
app.listen(PORT, () => {
    console.log(`🌷 Server running on port ${PORT}`);
});
