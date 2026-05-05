const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const products = [
  // Electronics
  {
    name: 'Wireless Noise-Cancelling Headphones',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
    description: 'Premium wireless headphones with ANC and 30-hour battery.',
    category: 'Electronics',
    stock: 50,
    rating: 4.5,
    reviews: 128,
  },
  {
    name: 'Mechanical Gaming Keyboard',
    price: 3999,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600',
    description: 'RGB mechanical keyboard with programmable macros.',
    category: 'Electronics',
    stock: 35,
    rating: 4.7,
    reviews: 89,
  },
  {
    name: 'Smart Watch Pro',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    description: 'Smartwatch with GPS, health tracking, and 7-day battery.',
    category: 'Electronics',
    stock: 20,
    rating: 4.4,
    reviews: 212,
  },
  {
    name: 'Portable Bluetooth Speaker',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
    description: '360° sound, waterproof, 12-hour playtime.',
    category: 'Electronics',
    stock: 45,
    rating: 4.5,
    reviews: 203,
  },
  {
    name: '4K Action Camera',
    price: 12999,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
    description: 'Capture 4K videos with stabilization.',
    category: 'Electronics',
    stock: 15,
    rating: 4.8,
    reviews: 156,
  },
  {
    name: 'Wireless Mouse',
    price: 799,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600',
    description: 'Ergonomic wireless mouse with long battery life.',
    category: 'Electronics',
    stock: 70,
    rating: 4.3,
    reviews: 150,
  },

  // Clothing
  {
    name: 'Cotton Casual T-Shirt (Pack of 3)',
    price: 799,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
    description: 'Comfortable cotton t-shirts for daily wear.',
    category: 'Clothing',
    stock: 200,
    rating: 4.2,
    reviews: 567,
  },
  {
    name: 'Men’s Denim Jacket',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
    description: 'Stylish denim jacket for all seasons.',
    category: 'Clothing',
    stock: 60,
    rating: 4.5,
    reviews: 210,
  },
  {
    name: 'Women’s Summer Dress',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600',
    description: 'Lightweight floral dress for summer.',
    category: 'Clothing',
    stock: 80,
    rating: 4.4,
    reviews: 190,
  },

  // Footwear
  {
    name: 'Running Shoes Ultra Boost',
    price: 4599,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    description: 'Lightweight running shoes with cushioning.',
    category: 'Footwear',
    stock: 80,
    rating: 4.6,
    reviews: 345,
  },
  {
    name: 'Casual Sneakers',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600',
    description: 'Comfortable sneakers for daily wear.',
    category: 'Footwear',
    stock: 90,
    rating: 4.4,
    reviews: 300,
  },

  // Bags
  {
    name: 'Minimalist Leather Backpack',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    description: 'Premium leather backpack with laptop sleeve.',
    category: 'Bags',
    stock: 40,
    rating: 4.3,
    reviews: 67,
  },
  {
    name: 'Travel Duffel Bag',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600',
    description: 'Spacious duffel bag for travel.',
    category: 'Bags',
    stock: 55,
    rating: 4.2,
    reviews: 120,
  },

  // Fitness
  {
    name: 'Yoga Mat Premium',
    price: 999,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
    description: 'Eco-friendly non-slip yoga mat.',
    category: 'Fitness',
    stock: 100,
    rating: 4.5,
    reviews: 289,
  },
  {
    name: 'Dumbbell Set (10kg)',
    price: 1999,
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600',
    description: 'Adjustable dumbbells for home workouts.',
    category: 'Fitness',
    stock: 65,
    rating: 4.6,
    reviews: 180,
  },
  {
    name: 'Skipping Rope',
    price: 299,
    image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=600',
    description: 'Speed skipping rope for cardio workouts.',
    category: 'Fitness',
    stock: 120,
    rating: 4.3,
    reviews: 140,
  },

  // Home & Office
  {
    name: 'Desk Lamp with Wireless Charger',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600',
    description: 'LED lamp with wireless charging.',
    category: 'Home & Office',
    stock: 60,
    rating: 4.4,
    reviews: 78,
  },
  {
    name: 'Office Chair Ergonomic',
    price: 6999,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600',
    description: 'Comfortable ergonomic office chair.',
    category: 'Home & Office',
    stock: 30,
    rating: 4.7,
    reviews: 95,
  },
  {
    name: 'Ceramic Coffee Mug Set',
    price: 449,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600',
    description: 'Set of 4 mugs, microwave safe.',
    category: 'Home & Office',
    stock: 75,
    rating: 4.3,
    reviews: 94,
  },

  // Misc
  {
    name: 'Stainless Steel Water Bottle',
    price: 599,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600',
    description: 'Insulated bottle, keeps drinks hot/cold.',
    category: 'Fitness',
    stock: 150,
    rating: 4.6,
    reviews: 431,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "ecommerce",
    });

    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑 Cleared existing products');

    const inserted = await Product.insertMany(products);
    console.log(`✅ Seeded ${inserted.length} products successfully`);

    mongoose.disconnect();
    console.log('✅ Done! Database seeded.');
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();