import { Category } from '@/db/models/category-model';
import { Order } from '@/db/models/order-model';
import { dbConnect } from '@/db/service/mongo';

export const getCategoryStatistics = async (): Promise<{
  totalCategories: number;
  mostPopularCategory: {
    categoryId: string;
    categoryName: string;
    totalSold: number;
  } | null;
}> => {
  await dbConnect();
  // Total Categories
  const totalCategories = await Category.countDocuments({ isDeleted: false });

  // Most Popular Category (based on product sales)
  const mostPopularCategory = await Order.aggregate([
    { $unwind: '$orderItems' }, // Unwind order items
    {
      $lookup: {
        from: 'products', // Join products collection
        localField: 'orderItems.productId',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    { $unwind: '$productDetails' }, // Unwind product details
    {
      $lookup: {
        from: 'categories', // Join categories collection
        localField: 'productDetails.category',
        foreignField: '_id',
        as: 'categoryDetails',
      },
    },
    { $unwind: '$categoryDetails' }, // Unwind category details
    {
      $group: {
        _id: '$categoryDetails._id',
        categoryName: { $first: '$categoryDetails.label' },
        totalSold: { $sum: '$orderItems.quantity' }, // Sum of product quantities sold
      },
    },
    { $sort: { totalSold: -1 } }, // Sort by total sold in descending order
    { $limit: 1 }, // Get the most popular category
  ]);

  const finalRes = {
    totalCategories,
    mostPopularCategory:
      mostPopularCategory.length > 0
        ? {
            categoryId: mostPopularCategory[0]._id.toString(),
            categoryName: mostPopularCategory[0].categoryName,
            totalSold: mostPopularCategory[0].totalSold,
          }
        : null,
  };

  return JSON.parse(JSON.stringify(finalRes));
};
