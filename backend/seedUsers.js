import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import connectDB from './config/db.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const users = [
  {
    username: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    username: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

const seedUsers = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    const createdUsers = await User.insertMany(users);
    console.log('Users Seeded:', createdUsers);
    process.exit();
  } catch (error) {
    console.error('User seeding error:', error.message);
    process.exit(1);
  }
};

seedUsers();
