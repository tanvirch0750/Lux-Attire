'use server';

import { createProduct } from '@/db/actions-and-queries/products/products-action';
import { IProduct } from '@/db/models/product-model';

export async function createProductAction(data: IProduct) {
  try {
    const product = await createProduct(data);
    return {
      data: product,
      status: 200,
    };
  } catch (e: any) {
    return {
      error: e?.message,
      status: 404,
    };
  }
}
