'use server';

import { Product, IProduct, IOffer } from '@/db/models/product-model';
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

export async function updateProductOffers(productId: string, offers: IOffer[]) {
  try {
    // Validate productId
    if (!Types.ObjectId.isValid(productId)) {
      throw new Error('Invalid product ID');
    }

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      throw new Error('Product not found');
    }

    // Validate offers
    if (!Array.isArray(offers)) {
      throw new Error('Offers must be an array');
    }

    // Validate each offer
    offers.forEach((offer, index) => {
      if (!['discount', 'freeShipping'].includes(offer.offerType)) {
        throw new Error(`Invalid offerType for offer at index ${index}`);
      }
      if (typeof offer.value !== 'number') {
        throw new Error(`Invalid value for offer at index ${index}`);
      }
      if (
        typeof offer.validUntil !== 'string' ||
        isNaN(Date.parse(offer.validUntil))
      ) {
        throw new Error(`Invalid validUntil date for offer at index ${index}`);
      }
      if (typeof offer.isActive !== 'boolean') {
        throw new Error(`Invalid isActive status for offer at index ${index}`);
      }
    });

    // Replace existing offers with new offers
    product.offers = offers;

    // Save the updated product
    await product.save();

    return product;
  } catch (error) {
    console.error('Error updating product offers:', error);
    throw error;
  }
}
