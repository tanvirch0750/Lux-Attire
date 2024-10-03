import { Order } from '@/db/models/order-model';
import { Product } from '@/db/models/product-model';
import { Review } from '@/db/models/review-model';

// Function to get all product-specific statistics
export const getProductStatistics = async (): Promise<{
  totalProducts: number;
  availableProducts: number;
  soldProducts: { productId: string; name: string; totalSold: number }[];
  averageRating: { productId: string; name: string; avgRating: number }[];
  mostPopularProducts: { productId: string; name: string; totalSold: number }[];
  totalReviews: { productId: string; name: string; reviewCount: number }[];
  revenuePerProduct: {
    productId: string;
    name: string;
    totalRevenue: number;
  }[];
}> => {
  // Total Products
  const totalProductsPromise = Product.countDocuments();

  // Available Products (products that are available for sale)
  const availableProductsPromise = Product.countDocuments({
    isAvailable: true,
  });

  // Sold Products (number of products sold per product)
  const soldProductsPromise = Order.aggregate([
    { $unwind: '$orderItems' }, // Unwind to access each order item separately
    {
      $group: {
        _id: '$orderItems.productId', // Group by productId
        totalSold: { $sum: '$orderItems.quantity' },
        name: { $first: '$orderItems.name' }, // Get the name of the product
      },
    },
    { $sort: { totalSold: -1 } }, // Sort by totalSold in descending order
  ]);

  // Average Rating per Product
  const averageRatingPromise = Review.aggregate([
    { $group: { _id: '$product', avgRating: { $avg: '$rating' } } },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    {
      $project: {
        _id: 0,
        productId: '$_id',
        name: '$product.name',
        avgRating: 1,
      },
    },
  ]);

  // Most Popular Products (highest sold products)
  const mostPopularProductsPromise = Order.aggregate([
    { $unwind: '$orderItems' },
    {
      $group: {
        _id: '$orderItems.productId',
        totalSold: { $sum: '$orderItems.quantity' },
        name: { $first: '$orderItems.name' },
      },
    },
    { $sort: { totalSold: -1 } }, // Sort by total sold in descending order
    { $limit: 5 }, // Get the top 5 most popular products
  ]);

  // Total Reviews per Product
  const totalReviewsPromise = Review.aggregate([
    { $group: { _id: '$product', reviewCount: { $sum: 1 } } },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: '_id',
        as: 'product',
      },
    },
    { $unwind: '$product' },
    {
      $project: {
        _id: 0,
        productId: '$_id',
        name: '$product.name',
        reviewCount: 1,
      },
    },
  ]);

  // Revenue Per Product (total revenue generated by each product)
  const revenuePerProductPromise = Order.aggregate([
    { $unwind: '$orderItems' },
    {
      $group: {
        _id: '$orderItems.productId',
        totalRevenue: { $sum: '$orderItems.totalPrice' },
        name: { $first: '$orderItems.name' },
      },
    },
    { $sort: { totalRevenue: -1 } }, // Sort by total revenue in descending order
  ]);

  // Execute all promises concurrently
  const [
    totalProducts,
    availableProducts,
    soldProducts,
    averageRating,
    mostPopularProducts,
    totalReviews,
    revenuePerProduct,
  ] = await Promise.all([
    totalProductsPromise,
    availableProductsPromise,
    soldProductsPromise,
    averageRatingPromise,
    mostPopularProductsPromise,
    totalReviewsPromise,
    revenuePerProductPromise,
  ]);

  return {
    totalProducts,
    availableProducts,
    soldProducts,
    averageRating,
    mostPopularProducts,
    totalReviews,
    revenuePerProduct,
  };
};
