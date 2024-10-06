'use server';

import { Review, IReview } from '@/db/models/review-model';
import { Types } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { dbConnect } from '@/db/service/mongo';

// Create a new review
export const createReview = async (reviewData: IReview) => {
  await dbConnect();
  try {
    const newReview = new Review(reviewData);
    await newReview.save();

    // Revalidate paths
    revalidatePath('/dashboard/reviews/[id]', 'page');
    revalidatePath('/my-orders/[id]', 'page');

    return JSON.parse(JSON.stringify(newReview));
  } catch (error) {
    throw new Error('Error creating review: ' + (error as Error).message);
  }
};

export const updateReviewByProductAndUser = async (
  reviewId: Types.ObjectId | string,
  userId: Types.ObjectId | string,
  productId: Types.ObjectId | string,
  orderId: Types.ObjectId | string,
  updateData: Partial<IReview>
) => {
  await dbConnect();
  try {
    // Update the review only if it matches the given user, order, and product
    const updatedReview = await Review.findOneAndUpdate(
      { _id: reviewId, user: userId, product: productId, order: orderId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      throw new Error('Review not found for this product and user');
    }

    return JSON.parse(JSON.stringify(updatedReview));
  } catch (error) {
    throw new Error('Error updating review: ' + (error as Error).message);
  }
};

// Update a review by ID
export const updateReviewById = async (
  reviewId: Types.ObjectId,
  updateData: Partial<IReview>
) => {
  await dbConnect();

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
export const deleteReviewById = async (reviewId: Types.ObjectId | string) => {
  await dbConnect();
  try {
    const deletedReview = await Review.findOneAndUpdate(
      { _id: reviewId },
      { isDeleted: true }, // If you want to use soft delete
      { new: true }
    );

    if (!deletedReview) {
      throw new Error('Review not found or is already deleted');
    }

    // Revalidate paths
    revalidatePath('/dashboard/reviews/[id]', 'page');
    revalidatePath('/my-orders/[id]', 'page');

    return JSON.parse(JSON.stringify(deletedReview));
  } catch (error) {
    throw new Error('Error deleting review: ' + (error as Error).message);
  }
};

// Undo delete functionality by setting isDeleted to false (if you want to add soft delete functionality)
export const undoDeleteReview = async (reviewId: Types.ObjectId | string) => {
  await dbConnect();
  try {
    const restoredReview = await Review.findOneAndUpdate(
      { _id: reviewId, isDeleted: true },
      { isDeleted: false },
      { new: true }
    );

    if (!restoredReview) {
      throw new Error('Review not found or is not deleted');
    }

    // Revalidate paths
    revalidatePath('/dashboard/reviews/[id]', 'page');
    revalidatePath('/my-orders/[id]', 'page');

    return JSON.parse(JSON.stringify(restoredReview));
  } catch (error) {
    throw new Error(
      'Error undoing review deletion: ' + (error as Error).message
    );
  }
};
