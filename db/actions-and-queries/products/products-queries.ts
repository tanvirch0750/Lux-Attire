import { Category } from '@/db/models/category-model';
import { Product } from '@/db/models/product-model';

import { Types } from 'mongoose';

// Get all products (only those that are not deleted)
export const getAllProducts = async () => {
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .populate('category');

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    throw new Error('Error fetching products: ' + (error as Error).message);
  }
};

// Get products by category-value (only those that are not deleted)
export const getProductsByCategoryValue = async (categoryValue: string) => {
  try {
    // Find the category by its value
    const category = await Category.findOne({
      value: categoryValue,
      isDeleted: false,
    });

    // If the category is not found, return an empty array or handle as needed
    if (!category) {
      throw new Error('Category not found');
    }

    // Find products associated with the category
    const products = await Product.find({
      category: category._id,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .populate('category');

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    throw new Error(
      'Error fetching products by category: ' + (error as Error).message
    );
  }
};

// Get the first 8 products (new arrivals, only those that are not deleted)
export const getNewArrivalProducts = async () => {
  try {
    const newArrivals = await Product.find({
      isDeleted: false,
      isAvailable: true,
    })
      .sort({ createdAt: -1 })
      .limit(8)
      .populate('category');

    return JSON.parse(JSON.stringify(newArrivals));
  } catch (error) {
    throw new Error('Error fetching new arrivals: ' + (error as Error).message);
  }
};

// Get all available products (only those that are not deleted)
export const getAllAvailableProducts = async () => {
  try {
    const products = await Product.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate('category');

    // await new Promise((res: any) => setTimeout(res, 3000));

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching products: ' + (error as Error).message);
  }
};

// Get a product by ID (only if not deleted)
export const getProductById = async (productId: Types.ObjectId | string) => {
  try {
    const product = await Product.findOne({
      _id: productId,
      isDeleted: false,
    }).populate('category');
    if (!product) {
      throw new Error('Product not found');
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    throw new Error('Unable to fetch products');
  }
};

export const getProductByIdAdmin = async (
  productId: Types.ObjectId | string
) => {
  try {
    const product = await Product.findOne({
      _id: productId,
    }).populate('category');
    if (!product) {
      throw new Error('Product not found');
    }
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    throw new Error('Error fetching product: ' + (error as Error).message);
  }
};
