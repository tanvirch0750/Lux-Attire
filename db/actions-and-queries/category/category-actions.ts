import { Category, ICategory } from '@/db/models/category-model';
import { Types } from 'mongoose';
import { revalidatePath } from 'next/cache';

// Create a new category
export const createCategory = async (categoryData: ICategory) => {
  try {
    const newCategory = new Category(categoryData);
    await newCategory.save();
    console.log('revalidation...');
    revalidatePath('/dashboard/category', 'page');

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error: any) {
    // Check if the error is a duplicate key error (E11000)
    if (error.code === 11000) {
      throw new Error('Category already exists'); // Custom error message
    }
    throw new Error('Error creating category');
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
  } catch (error: any) {
    // Check if the error is a duplicate key error (E11000)
    if (error.code === 11000) {
      throw new Error('Category already exists');
    }
    throw new Error('Error creating category: ' + error.message);
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
