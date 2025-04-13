import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import Category from './models/categoryModel.js';
import connectDB from './config/db.js';

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany();

    const categories = await Category.find({});
    const smartphonesCat = categories.find(cat => cat.name === 'Smartphones');
    const laptopsCat = categories.find(cat => cat.name === 'Laptops');
    const headphonesCat = categories.find(cat => cat.name === 'Headphones');

    const sampleProducts = [
      {
        name: 'Apple iPhone 14',
        image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/3/5/l/-original-imaghx9qmgqsk9s4.jpeg?q=90&crop=false',
        brand: 'Apple',
        quantity: 1,
        category: smartphonesCat._id,
        description: 'Latest Apple iPhone with advanced features.',
        price: 999,
        countInStock: 15,
        rating: 4.5,
        numReviews: 10,
        reviews: []
      },
      {
        name: 'Samsung Galaxy S23',
        image: 'https://images.samsung.com/is/image/samsung/p6pim/in/feature/164487493/in-feature-galaxy-s-535964244?$FB_TYPE_A_MO_JPG$',
        brand: 'Samsung',
        quantity: 1,
        category: smartphonesCat._id,
        description: 'High-end Android smartphone from Samsung.',
        price: 899,
        countInStock: 20,
        rating: 4.0,
        numReviews: 8,
        reviews: []
      },
      {
        name: 'Sony WH-1000XM5',
        image: 'https://static1.pocketnowimages.com/wordpress/wp-content/uploads/styles/xxlarge/public/2022-05/Featured%20Image%20Sony%20WH%201000%20XM5.jpg',
        brand: 'Sony',
        quantity: 1,
        category: headphonesCat._id,
        description: 'Noise cancelling headphones.',
        price: 349,
        countInStock: 10,
        rating: 4.8,
        numReviews: 15,
        reviews: []
      },
      {
        name: 'Apple MacBook Pro 14"',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        brand: 'Apple',
        quantity: 1,
        category: laptopsCat._id,
        description: 'M1 chip powered MacBook with Retina display.',
        price: 1999,
        countInStock: 8,
        rating: 4.9,
        numReviews: 20,
        reviews: []
      }
    ];

    const createdProducts = await Product.insertMany(sampleProducts);
    console.log('Products Seeded:', createdProducts);
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedProducts();
