import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Order from './models/Order.js';
import Product from './models/Product.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const seedOrders = async () => {
  try {
    await connectDB();
    await Order.deleteMany();

    const user = await User.findOne(); // or hardcode an ObjectId
    const product = await Product.findOne(); // at least one product required

    if (!user || !product) {
      console.log("Please seed users and products first.");
      process.exit();
    }

    const order = new Order({
      user: user._id,
      orderItems: [
        {
          name: product.name,
          qty: 2,
          image: product.image,
          price: product.price,
          product: product._id,
        },
      ],
      shippingAddress: {
        address: '123 Main St',
        city: 'New York',
        postalCode: '10001',
        country: 'USA',
      },
      paymentMethod: 'PayPal',
      itemsPrice: product.price * 2,
      taxPrice: 20,
      shippingPrice: 10,
      totalPrice: product.price * 2 + 30,
      isPaid: true,
      paidAt: Date.now(),
      isDelivered: false,
    });

    const createdOrder = await order.save();
    console.log('Order Seeded:', createdOrder);
    process.exit();
  } catch (error) {
    console.error('Order seeding error:', error.message);
    process.exit(1);
  }
};

seedOrders();
