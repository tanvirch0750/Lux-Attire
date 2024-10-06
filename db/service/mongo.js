/* eslint-disable @typescript-eslint/no-unused-vars */

import mongoose from 'mongoose';

import { Category } from '../models/category-model';
import { Product } from '../models/product-model';

// export async function dbConnect() {
//   try {
//     const conn = await mongoose.connect(
//       String(process.env.MONGODB_CONNECTION_STRING)
//     );
//     console.log('MongoDB Connected');
//     return conn;
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//   }
// }

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_CONNECTION_STRING environment variable'
  );
}

/**
 * Global is used to maintain a cache of the connection
 * across hot-reloads in development and avoid double connections.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    // If a connection is already established, reuse it
    return cached.conn;
  }

  if (!cached.promise) {
    // If no promise exists, create one and initiate the connection
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Await the promise and store the connection
    cached.conn = await cached.promise;
    console.log('MongoDB connected');
    return cached.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
