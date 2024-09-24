import { Category, ICategory } from '@/db/models/category-model';
import { Document, Types } from 'mongoose';
import { unstable_cache } from 'next/cache';

// Get all categories
export const getAllCategories = async () => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return categories;
  } catch (error) {
    throw new Error('Error fetching categories: ' + (error as Error).message);
  }
};

// Get a category by ID
export const getCategoryById = async (categoryId: Types.ObjectId) => {
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    return category;
  } catch (error) {
    throw new Error('Error fetching category');
  }
};
