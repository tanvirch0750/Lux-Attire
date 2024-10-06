import { Category } from '@/db/models/category-model';
import { dbConnect } from '@/db/service/mongo';
import { Types } from 'mongoose';

// Get all categories
export const getAllCategories = async () => {
  await dbConnect();
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    throw new Error('Error fetching categories: ' + (error as Error).message);
  }
};

// Get a category by ID
export const getCategoryById = async (categoryId: Types.ObjectId) => {
  await dbConnect();
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw new Error('Category not found');
    }
    return JSON.parse(JSON.stringify(category));
  } catch (error) {
    throw new Error('Error fetching category');
  }
};
