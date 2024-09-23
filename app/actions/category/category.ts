'use server';

import { createCategory } from '@/db/actions-and-queries/category/category-actions';
import { ICategory } from '@/db/models/category-model';

export async function createCategoryAction(data: ICategory) {
  try {
    const course = await createCategory(data);
    return {
      data: course,
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
