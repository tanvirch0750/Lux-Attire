import { Category, ICategory } from '@/db/models/category-model';
import { Types } from 'mongoose';
import { revalidatePath } from 'next/cache';

// Create a new category
export const createCategory = async (categoryData: ICategory) => {
  try {
    const newCategory = new Category(categoryData);
    await newCategory.save();

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
  categoryId: Types.ObjectId | string,
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

    revalidatePath('/dashboard/category', 'page');
    return JSON.parse(JSON.stringify(updatedCategory));
  } catch (error: any) {
    // Check if the error is a duplicate key error (E11000)
    if (error.code === 11000) {
      throw new Error('Category already exists');
    }
    throw new Error('Error updating category');
  }
};

// Soft delete a category by updating isDeleted to true
export const deleteCategoryById = async (
  categoryId: Types.ObjectId | string
) => {
  try {
    const deletedCategory = await Category.findOneAndUpdate(
      { _id: categoryId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!deletedCategory) {
      throw new Error('Category not found or is already deleted');
    }

    revalidatePath('/dashboard/category', 'page');

    return JSON.parse(JSON.stringify(deletedCategory));
  } catch (error) {
    throw new Error('Error deleting Category');
  }
};

// Undo delete functionality by setting isDeleted to false
export const undoDeleteCategory = async (
  categoryId: Types.ObjectId | string
) => {
  try {
    const restoredCategory = await Category.findOneAndUpdate(
      { _id: categoryId, isDeleted: true },
      { isDeleted: false },
      { new: true }
    );

    if (!restoredCategory) {
      throw new Error('Category not found or is not deleted');
    }

    revalidatePath('/dashboard/category', 'page');

    return JSON.parse(JSON.stringify(restoredCategory));
  } catch (error) {
    throw new Error('Error undoing category deletion');
  }
};
