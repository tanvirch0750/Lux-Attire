import { Review } from '@/db/models/review-model';
import { Types } from 'mongoose';

// Get all reviews for a specific product
export const getReviewsByProduct = async (productId: Types.ObjectId) => {
  try {
    const reviews = await Review.find({ product: productId });
    return reviews;
  } catch (error) {
    throw new Error('Error fetching reviews: ' + (error as Error).message);
  }
};

// Get a single review by ID
export const getReviewById = async (reviewId: Types.ObjectId) => {
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  } catch (error) {
    throw new Error('Error fetching review: ' + (error as Error).message);
  }
};

// Get all reviews (only admin can access)
export const getAllReviews = async (role: string) => {
  if (role !== 'admin') {
    throw new Error('Only admins can access all reviews');
  }

  try {
    const reviews = await Review.find({ isDeleted: false }); // Adjust query if you use soft delete
    return reviews;
  } catch (error) {
    throw new Error('Error fetching reviews: ' + (error as Error).message);
  }
};

// Get review statistics for a specific product
export const getReviewStatsByProduct = async (productId: Types.ObjectId) => {
  try {
    // Aggregate reviews to get average rating and total count
    const stats = await Review.aggregate([
      { $match: { product: productId, isDeleted: false } }, // Adjust query if you use soft delete
      {
        $group: {
          _id: '$product',
          averageRating: { $avg: '$rating' },
          totalReviews: { $count: {} },
        },
      },
    ]);

    if (stats.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
      };
    }

    return stats[0];
  } catch (error) {
    throw new Error(
      'Error fetching review statistics: ' + (error as Error).message
    );
  }
};
