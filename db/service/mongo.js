/* eslint-disable @typescript-eslint/no-unused-vars */

import mongoose from 'mongoose';

import { Category } from '../models/category-model';
import { Product } from '../models/product-model';

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(
      String(process.env.MONGODB_CONNECTION_STRING)
    );
    console.log('MongoDB Connected');
    return conn;
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}
