'use server';

import { Review, IReview } from '@/db/models/review-model';
import { Types } from 'mongoose';

// Create a new review
export const createReview = async (reviewData: IReview, role: string) => {
  if (role !== 'user') {
    throw new Error('Only users can create reviews');
  }

  try {
    const newReview = new Review(reviewData);
    await newReview.save();
    return newReview;
  } catch (error) {
    throw new Error('Error creating review: ' + (error as Error).message);
  }
};

// Update a review by ID
export const updateReviewById = async (
  reviewId: Types.ObjectId,
  updateData: Partial<IReview>,
  role: string
) => {
  if (role !== 'admin') {
    throw new Error('Only admin can update reviews');
  }

  try {
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      throw new Error('Review not found');
    }
    return updatedReview;
  } catch (error) {
    throw new Error('Error updating review: ' + (error as Error).message);
  }
};

// Soft delete a review by updating isDeleted to true (if you want to add soft delete functionality)
export const deleteReviewById = async (
  reviewId: Types.ObjectId,
  role: string
) => {
  if (role !== 'admin') {
    throw new Error('Only admins can delete reviews');
  }

  try {
    const deletedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { isDeleted: true }, // If you want to use soft delete
      { new: true }
    );

    if (!deletedReview) {
      throw new Error('Review not found or is already deleted');
    }

    return deletedReview;
  } catch (error) {
    throw new Error('Error deleting review: ' + (error as Error).message);
  }
};

// Undo delete functionality by setting isDeleted to false (if you want to add soft delete functionality)
export const undoDeleteReview = async (
  reviewId: Types.ObjectId,
  role: string
) => {
  if (role !== 'admin') {
    throw new Error('Only admins can undo review deletion');
  }

  try {
    const restoredReview = await Review.findOneAndUpdate(
      { _id: reviewId, isDeleted: true },
      { isDeleted: false },
      { new: true }
    );

    if (!restoredReview) {
      throw new Error('Review not found or is not deleted');
    }

    return restoredReview;
  } catch (error) {
    throw new Error(
      'Error undoing review deletion: ' + (error as Error).message
    );
  }
};
