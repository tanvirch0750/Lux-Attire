'use server';

import {
  createCategory,
  deleteCategoryById,
  undoDeleteCategory,
  updateCategoryById,
} from '@/db/actions-and-queries/category/category-actions';
import { ICategory } from '@/db/models/category-model';
import { Types } from 'mongoose';

export async function createCategoryAction(data: ICategory) {
  try {
    const category = await createCategory(data);
    return {
      data: category,
      status: 200,
    };
  } catch (e: any) {
    console.log('inside server actions', e?.message);
    return {
      error: e?.message,
      status: 404,
    };
  }
}

export async function updateCategoryAction(
  categoryId: Types.ObjectId | string,
  data: ICategory
) {
  try {
    const category = await updateCategoryById(categoryId, data);
    return {
      data: category,
      status: 200,
    };
  } catch (e: any) {
    return {
      error: e?.message,
      status: 404,
    };
  }
}

export async function deleteCategoryAction(
  categoryId: Types.ObjectId | string
) {
  try {
    const category = await deleteCategoryById(categoryId);
    return {
      data: category,
      status: 200,
    };
  } catch (e: any) {
    return {
      error: e?.message,
      status: 404,
    };
  }
}

export async function undoDeleteCategoryAction(
  categoryId: Types.ObjectId | string
) {
  try {
    const category = await undoDeleteCategory(categoryId);
    return {
      data: category,
      status: 200,
    };
  } catch (e: any) {
    return {
      error: e?.message,
      status: 404,
    };
  }
}
