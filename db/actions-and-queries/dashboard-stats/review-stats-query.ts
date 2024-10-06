import { Review } from '@/db/models/review-model';
import { dbConnect } from '@/db/service/mongo';

export const getReviewStatistics = async (): Promise<{
  totalReviews: number;
  averageRating: number;
  mostReviewedProducts: {
    productId: string;
    productName: string;
    reviewCount: number;
  }[];
  topRatedProducts: {
    productId: string;
    productName: string;
    averageRating: number;
  }[];
}> => {
  await dbConnect();
  // Total Reviews
  const totalReviews = await Review.countDocuments({});

  // Average Rating
  const averageRatingResult = await Review.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
      },
    },
  ]);
  const averageRating =
    averageRatingResult.length > 0 ? averageRatingResult[0].averageRating : 0;

  // Most Reviewed Products (products with the highest number of reviews)
  const mostReviewedProducts = await Review.aggregate([
    {
      $group: {
        _id: '$product', // Group by product ID
        reviewCount: { $sum: 1 },
      },
    },
    { $sort: { reviewCount: -1 } }, // Sort by review count descending
    { $limit: 5 }, // Limit to top 5 most reviewed products
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    { $unwind: '$productDetails' },
    {
      $project: {
        productId: '$_id',
        productName: '$productDetails.name',
        reviewCount: 1,
      },
    },
  ]);

  // Top-Rated Products (products with the highest average rating)
  const topRatedProducts = await Review.aggregate([
    {
      $group: {
        _id: '$product', // Group by product ID
        averageRating: { $avg: '$rating' },
      },
    },
    { $sort: { averageRating: -1 } }, // Sort by average rating descending
    { $limit: 5 }, // Limit to top 5 top-rated products
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    { $unwind: '$productDetails' },
    {
      $project: {
        productId: '$_id',
        productName: '$productDetails.name',
        averageRating: 1,
      },
    },
  ]);

  return {
    totalReviews,
    averageRating,
    mostReviewedProducts,
    topRatedProducts,
  };
};
