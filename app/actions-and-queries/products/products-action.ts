'use server';

import { Product, IProduct } from '@/db/models/product-model';
import { Types } from 'mongoose';

// Create a new product (only admin can create)
export const createProduct = async (productData: IProduct, role: string) => {
  if (role !== 'admin') {
    throw new Error('Only admins can create products');
  }

  try {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error('Error creating product: ' + (error as Error).message);
  }
};

// Update a product by ID (only admin can update)
export const updateProductById = async (
  productId: Types.ObjectId,
  updateData: Partial<IProduct>,
  role: string
) => {
  if (role !== 'admin') {
    throw new Error('Only admins can update products');
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId, isDeleted: false },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      throw new Error('Product not found or is deleted');
    }
    return updatedProduct;
  } catch (error) {
    throw new Error('Error updating product: ' + (error as Error).message);
  }
};

// Soft delete a product by updating isDeleted to true
export const deleteProductById = async (
  productId: Types.ObjectId,
  role: string
) => {
  if (role !== 'admin') {
    throw new Error('Only admins can delete products');
  }

  try {
    const deletedProduct = await Product.findOneAndUpdate(
      { _id: productId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!deletedProduct) {
      throw new Error('Product not found or is already deleted');
    }

    return deletedProduct;
  } catch (error) {
    throw new Error('Error deleting product: ' + (error as Error).message);
  }
};

// Undo delete functionality by setting isDeleted to false
export const undoDeleteProduct = async (
  productId: Types.ObjectId,
  role: string
) => {
  if (role !== 'admin') {
    throw new Error('Only admins can undo product deletion');
  }

  try {
    const restoredProduct = await Product.findOneAndUpdate(
      { _id: productId, isDeleted: true },
      { isDeleted: false },
      { new: true }
    );

    if (!restoredProduct) {
      throw new Error('Product not found or is not deleted');
    }

    return restoredProduct;
  } catch (error) {
    throw new Error(
      'Error undoing product deletion: ' + (error as Error).message
    );
  }
};
