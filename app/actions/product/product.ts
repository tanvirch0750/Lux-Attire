'use server';

import {
  createProduct,
  deleteProductById,
  undoDeleteProduct,
  updateProductById,
} from '@/db/actions-and-queries/products/products-action';
import { IProduct } from '@/db/models/product-model';
import { isErrorWithMessage } from '@/lib/utils';
import { Types } from 'mongoose';

export async function createProductAction(data: IProduct) {
  try {
    const product = await createProduct(data);
    return {
      data: product,
      status: 200,
    };
  } catch (e: unknown) {
    return {
      error: isErrorWithMessage(e) ? e.message : 'Unknown error occurred',
      status: 404,
    };
  }
}

export async function updateProdcutAction(
  productId: Types.ObjectId | string,
  data: IProduct
) {
  try {
    const product = await updateProductById(productId, data);
    return {
      data: product,
      status: 200,
    };
  } catch (e: unknown) {
    return {
      error: isErrorWithMessage(e) ? e.message : 'Unknown error occurred',
      status: 404,
    };
  }
}

export async function deleteProductAction(productId: Types.ObjectId | string) {
  try {
    const product = await deleteProductById(productId);
    return {
      data: product,
      status: 200,
    };
  } catch (e: unknown) {
    return {
      error: isErrorWithMessage(e) ? e.message : 'Unknown error occurred',
      status: 404,
    };
  }
}

export async function undoDeleteProductAction(
  productId: Types.ObjectId | string
) {
  try {
    const product = await undoDeleteProduct(productId);
    return {
      data: product,
      status: 200,
    };
  } catch (e: unknown) {
    return {
      error: isErrorWithMessage(e) ? e.message : 'Unknown error occurred',
      status: 404,
    };
  }
}
