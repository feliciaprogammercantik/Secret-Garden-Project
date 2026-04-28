const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

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

app.get('/api', (req, res) => {
    res.json({ message: 'Florist API is running 🌸' });
});

app.listen(PORT, () => {
    console.log(`🌷 Florist server running on http://localhost:${PORT}`);
});
