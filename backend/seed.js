const mysql = require('mysql2/promise');
require('dotenv').config();
const bcrypt = require('bcryptjs');

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: process.env.DB_PORT || 3306
  });

  console.log('🌱 Connected to MySQL');

  await connection.query('CREATE DATABASE IF NOT EXISTS florist_db');
  await connection.query('USE florist_db');
  console.log('📦 Database florist_db ready');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description TEXT,
      image_url VARCHAR(500),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_id INT,
      name VARCHAR(200) NOT NULL,
      description TEXT,
      price DECIMAL(12, 0) NOT NULL,
      image_url VARCHAR(500),
      is_featured TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      phone VARCHAR(20),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Tables ready');

  await connection.query('SET FOREIGN_KEY_CHECKS = 0');
  await connection.query('TRUNCATE TABLE products');
  await connection.query('TRUNCATE TABLE categories');
  await connection.query('TRUNCATE TABLE admins');
  await connection.query('SET FOREIGN_KEY_CHECKS = 1');

  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  await connection.query(
    'INSERT IGNORE INTO admins (username, password_hash) VALUES (?, ?)',
    ['admin', adminPasswordHash]
  );
  console.log('👤 Admin user seeded');

  const categories = [
    ['Wedding', 'Elegant floral arrangements for your most special day', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600'],
    ['Celebrations', 'Vibrant and joyful blooms to celebrate life\'s milestones', 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600'],
    ['Sympathy', 'Thoughtful arrangements to express your deepest condolences', 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600'],
    ['Romance', 'Romantic flowers to express love and devotion', 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600'],
    ['Décor', 'Beautiful florals to elevate any space or occasion', 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600'],
    ['Add-ons', 'Extra special touches for your arrangement', 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600']
  ];

  for (const cat of categories) {
    await connection.query(
      'INSERT INTO categories (name, description, image_url) VALUES (?, ?, ?)',
      cat
    );
  }
  console.log('🌼 Categories seeded');

  const products = [
    [1, 'Elegant White Rose Bouquet', 'A luxurious arrangement of 24 premium white roses with delicate baby\'s breath accents. Perfect for bridal bouquets and wedding decor.', 850000, 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600', 1],
    [1, 'Peony Wedding Arrangement', 'An opulent peony arrangement with eucalyptus touches, available in soft pastels and pure whites. The epitome of wedding elegance.', 1200000, 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600', 1],
    [1, 'Garden Wedding Centerpiece', 'A romantic garden-style centerpiece featuring a lush mix of seasonal blooms, perfect for reception tables.', 650000, 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=600', 0],
    [2, 'Colorful Birthday Bloom', 'A vibrant, cheerful bouquet featuring gerberas, lilies, and chrysanthemums — guaranteed to make their birthday unforgettable.', 450000, 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600', 1],
    [2, 'Sunflower Happiness', 'A radiant bouquet of 12 fresh sunflowers with lush greenery. Pure sunshine in a bouquet.', 380000, 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=600', 0],
    [2, 'Pastel Birthday Box', 'An exquisite flower box filled with pastel blooms and premium chocolates — the ultimate birthday surprise.', 550000, 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600', 0],
    [3, 'White Lily Tribute', 'A graceful arrangement of pure white lilies, expressing sympathy and remembrance with quiet dignity.', 500000, 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600', 0],
    [3, 'Peace Wreath', 'A traditional condolence wreath featuring white chrysanthemums and a black satin ribbon.', 750000, 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600', 0],
    [4, 'Red Rose Romance', 'A grand bouquet of 36 premium long-stem red roses, symbolizing true love. Wrapped in luxury paper with satin ribbon.', 680000, 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600', 1],
    [4, 'Pink Tulip Love', 'A romantic bouquet of 20 imported pink tulips with premium wrapping — a timeless expression of affection.', 520000, 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600', 0],
    [5, 'Rustic Table Arrangement', 'A charming rustic-style table arrangement combining dried and fresh flowers, perfect for homes and cafes.', 350000, 'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=600', 1],
    [5, 'Orchid Elegance', 'A stunning white phalaenopsis orchid in a premium ceramic pot. Low maintenance and long-lasting beauty.', 420000, 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=600', 0],
    [6, 'Premium Greeting Card', 'A beautifully crafted handwritten note card.', 20000, 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600', 0],
    [6, 'Ferrero Rocher Box', 'A delicious box of premium chocolates to sweeten the moment.', 150000, 'https://images.unsplash.com/photo-1552538166-3d4a46a51d8b?w=600', 0],
    [6, 'Plush Teddy Bear', 'A soft and cuddly 20cm teddy bear, perfect for hugging.', 120000, 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600', 0]
  ];

  for (const prod of products) {
    await connection.query(
      'INSERT INTO products (category_id, name, description, price, image_url, is_featured) VALUES (?, ?, ?, ?, ?, ?)',
      prod
    );
  }
  console.log('🌺 Products seeded');

  console.log('\n✨ Database seeding completed successfully!');
  await connection.end();
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
