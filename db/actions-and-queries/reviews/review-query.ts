import { Review } from '@/db/models/review-model';
import { Types } from 'mongoose';

// Get all reviews for a specific product
export const getReviewsByProduct = async (
  productId: Types.ObjectId | string
) => {
  try {
    const reviews = await Review.find({
      product: productId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .populate('user', 'name email profilePicture'); // Populate user with name and email

    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    throw new Error('Error fetching reviews: ' + (error as Error).message);
  }
};

// Get all reviews for a specific product
export const getReviewsByProductAdmin = async (
  productId: Types.ObjectId | string
) => {
  try {
    const reviews = await Review.find({
      product: productId,
    })
      .sort({ createdAt: -1 })
      .populate('user', 'name email profilePicture'); // Populate user with name and email

    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    throw new Error('Error fetching reviews: ' + (error as Error).message);
  }
};

// Get a single review by ID
export const getReviewById = async (reviewId: Types.ObjectId) => {
  try {
    const review = await Review.findById(reviewId)
      .populate('user', 'name email')
      .populate('product', 'name price');

    if (!review) {
      throw new Error('Review not found');
    }
    return review;
  } catch (error) {
    throw new Error('Error fetching review: ' + (error as Error).message);
  }
};

export const getReviewByProductAndUser = async (
  productId: Types.ObjectId | string,
  userId: Types.ObjectId | string,
  orderId: Types.ObjectId | string
) => {
  try {
    const review = await Review.findOne({
      product: productId,
      user: userId,
      order: orderId,
    })
      .populate('user', 'name email')
      .populate('product', 'name price');

    if (!review) {
      return JSON.parse(JSON.stringify('review-error'));
    }

    return JSON.parse(JSON.stringify(review));
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
    const reviews = await Review.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('product', 'name price');

    return JSON.parse(JSON.stringify(reviews));
  } catch (error) {
    throw new Error('Error fetching reviews: ' + (error as Error).message);
  }
};

// Get review statistics for a specific product
export const getReviewStatsByProduct = async (
  productId: Types.ObjectId | string
) => {
  try {
    const objectIdProduct =
      typeof productId === 'string' ? new Types.ObjectId(productId) : productId;

    // Aggregate reviews to get average rating and total count
    const stats = await Review.aggregate([
      {
        $match: {
          product: objectIdProduct,
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: '$product',
          averageRating: { $avg: '$rating' },
          totalReviews: { $sum: 1 },
        },
      },
      {
        $addFields: {
          averageRating: { $round: ['$averageRating', 0] },
        },
      },
    ]);

    console.log('review stats', stats);

    // If no stats found, return default values
    if (stats.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
      };
    }

    return JSON.parse(JSON.stringify(stats[0]));
  } catch (error) {
    throw new Error(
      'Error fetching review statistics: ' + (error as Error).message
    );
  }
};
