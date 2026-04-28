const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: 'florist_db',
        port: process.env.DB_PORT || 3306
    });

    console.log('🌱 Connected to MySQL');

    await connection.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
    console.log('📦 Admins table ready');

    await connection.query(`
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      invoice_code VARCHAR(50) UNIQUE NOT NULL,
      customer_name VARCHAR(100) NOT NULL,
      customer_phone VARCHAR(20) NOT NULL,
      total_amount DECIMAL(12, 0) NOT NULL,
      status VARCHAR(50) DEFAULT 'Pending Payment',
      order_items JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
    console.log('📦 Orders table ready');

    await connection.query(`
    CREATE TABLE IF NOT EXISTS settings (
      setting_key VARCHAR(50) PRIMARY KEY,
      setting_value TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
    console.log('📦 Settings table ready');

    await connection.query(`
    INSERT IGNORE INTO settings (setting_key, setting_value) VALUES ('whatsapp_number', '6285338001840')
  `);
    console.log('⚙️ Default settings applied');

    await connection.end();
    console.log('✅ Migration complete');
}

migrate().catch(console.error);
