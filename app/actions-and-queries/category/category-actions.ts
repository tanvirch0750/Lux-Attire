'use server';

import { Category, ICategory } from '@/db/models/category-model';
import { Types } from 'mongoose';

// Create a new category
export const createCategory = async (categoryData: ICategory) => {
  console.log(categoryData);
  try {
    const newCategory = new Category(categoryData);
    await newCategory.save();
    return newCategory;
  } catch (error) {
    throw new Error('Error creating category: ' + (error as Error).message);
  }
};

// Update a category by ID
export const updateCategoryById = async (
  categoryId: Types.ObjectId,
  updateData: Partial<ICategory>
) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedCategory) {
      throw new Error('Category not found');
    }
    return updatedCategory;
  } catch (error) {
    throw new Error('Error updating category: ' + (error as Error).message);
  }
};

// Delete a category by ID
export const deleteCategoryById = async (categoryId: Types.ObjectId) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      throw new Error('Category not found');
    }
    return deletedCategory;
  } catch (error) {
    throw new Error('Error deleting category: ' + (error as Error).message);
  }
};
