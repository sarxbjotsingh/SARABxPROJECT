import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/categoryModel.js'; // Adjust the path as needed
import connectDB from './config/db.js';

dotenv.config();

const categories = [
  { name: 'Smartphones' },
  { name: 'Laptops' },
  { name: 'Headphones' },
  { name: 'Accessories' }
];

const seedCategories = async () => {
  try {
    await connectDB();
    await Category.deleteMany();
    const createdCategories = await Category.insertMany(categories);
    console.log('Categories Seeded:', createdCategories);
    process.exit();
  } catch (error) {
    console.error('Error seeding categories:', error.message);
    process.exit(1);
  }
};

seedCategories();
