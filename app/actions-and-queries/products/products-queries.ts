import { Product, IProduct } from '@/db/models/product-model';
import { Types } from 'mongoose';

// Get all products (only those that are not deleted)
export const getAllProducts = async () => {
  try {
    const products = await Product.find({ isDeleted: false }).populate(
      'category'
    );
    return products;
  } catch (error) {
    throw new Error('Error fetching products: ' + (error as Error).message);
  }
};

// Get a product by ID (only if not deleted)
export const getProductById = async (productId: Types.ObjectId) => {
  try {
    const product = await Product.findOne({
      _id: productId,
      isDeleted: false,
    }).populate('category');
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    throw new Error('Error fetching product: ' + (error as Error).message);
  }
};
