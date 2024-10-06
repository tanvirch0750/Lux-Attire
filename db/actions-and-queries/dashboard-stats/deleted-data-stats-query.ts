import { Category } from '@/db/models/category-model';
import { Order } from '@/db/models/order-model';
import { Product } from '@/db/models/product-model';
import { Review } from '@/db/models/review-model';
import { dbConnect } from '@/db/service/mongo';

export const getDeletedDataTracking = async (): Promise<{
  deletedProductsCount: number;
  deletedCategoriesCount: number;
  deletedOrdersCount: number;
  deletedReviewsCount: number;
}> => {
  await dbConnect();
  // Count Deleted Products
  const deletedProductsCount = await Product.countDocuments({
    isDeleted: true,
  });

  // Count Deleted Categories
  const deletedCategoriesCount = await Category.countDocuments({
    isDeleted: true,
  });

  // Count Deleted Orders
  const deletedOrdersCount = await Order.countDocuments({ isDeleted: true });

  // Count Deleted Reviews
  const deletedReviewsCount = await Review.countDocuments({ isDeleted: true });

  return {
    deletedProductsCount,
    deletedCategoriesCount,
    deletedOrdersCount,
    deletedReviewsCount,
  };
};
