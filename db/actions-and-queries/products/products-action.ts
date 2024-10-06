'use server';

import { Product, IProduct } from '@/db/models/product-model';
import { Types } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { dbConnect } from '@/db/service/mongo';

interface MongoError extends Error {
  code?: number;
}

// Create a new product (only admin can create)
export const createProduct = async (productData: IProduct) => {
  await dbConnect();
  try {
    const newProduct = new Product(productData);
    await newProduct.save();

    revalidatePath('/dashboard/products', 'page');
    revalidatePath('/products', 'page');

    return JSON.parse(JSON.stringify(newProduct));
  } catch (error) {
    const typedError = error as MongoError;
    console.log(typedError);
    // Check if the error is a duplicate key error (E11000)
    if (typedError.code === 11000) {
      throw new Error('Product already exists'); // Custom error message
    }
    throw new Error('Error creating product');
  }
};

// Update a product by ID (only admin can update)
export const updateProductById = async (
  productId: Types.ObjectId | string,
  updateData: Partial<IProduct>
) => {
  await dbConnect();
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    revalidatePath('/dashboard/products');
    revalidatePath('/dashboard/products/[id]', 'page');
    revalidatePath('/products', 'page');

    return JSON.parse(JSON.stringify(updatedProduct));
  } catch (error) {
    const typedError = error as MongoError;
    // Check if the error is a duplicate key error (E11000)
    if (typedError.code === 11000) {
      throw new Error('Product already exists');
    }
    throw new Error('Error updating Product');
  }
};

// Soft delete a product by updating isDeleted to true
export const deleteProductById = async (productId: Types.ObjectId | string) => {
  await dbConnect();
  try {
    const deletedProduct = await Product.findOneAndUpdate(
      { _id: productId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!deletedProduct) {
      throw new Error('Product not found or is already deleted');
    }

    revalidatePath('/dashboard/products', 'page');
    revalidatePath('/dashboard/products/[id]', 'page');
    revalidatePath('/products', 'page');

    return JSON.parse(JSON.stringify(deletedProduct));
  } catch (error) {
    throw new Error('Error deleting product');
  }
};

// Undo delete functionality by setting isDeleted to false
export const undoDeleteProduct = async (productId: Types.ObjectId | string) => {
  await dbConnect();
  try {
    const restoredProduct = await Product.findOneAndUpdate(
      { _id: productId, isDeleted: true },
      { isDeleted: false },
      { new: true }
    );

    if (!restoredProduct) {
      throw new Error('product not found or is not deleted');
    }

    revalidatePath('/dashboard/products', 'page');
    revalidatePath('/dashboard/products/[id]', 'page');
    revalidatePath('/products', 'page');
    revalidatePath('/products/[id]', 'page');

    return JSON.parse(JSON.stringify(restoredProduct));
  } catch (error) {
    throw new Error('Error undoing product deletion');
  }
};
