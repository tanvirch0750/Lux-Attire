import { Order } from '@/db/models/order-model';
import { User } from '@/db/models/user-model';
import { subMonths } from 'date-fns'; // For date manipulation
import { dbConnect } from '@/db/service/mongo';

export const getUserStatistics = async (): Promise<{
  totalUsers: number;
  activeUsers: number;
  topCustomers: { userId: string; userName: string; totalSpent: number }[];
  newUsers: number;
  adminCount: number;
  regularUserCount: number;
}> => {
  await dbConnect();
  // Total Users
  const totalUsers = await User.countDocuments({});

  // Active Users (users with at least one order)
  const activeUsers = await Order.distinct('user').countDocuments();

  // Top Customers (users with highest total spending)
  const topCustomers = await Order.aggregate([
    {
      $group: {
        _id: '$user',
        totalSpent: { $sum: '$totalPrice' },
      },
    },
    { $sort: { totalSpent: -1 } }, // Sort by total spent descending
    { $limit: 5 }, // Limit to top 5 customers
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'userDetails',
      },
    },
    { $unwind: '$userDetails' },
    {
      $project: {
        userId: '$_id',
        userName: '$userDetails.email',
        totalSpent: 1,
      },
    },
  ]);

  // New Users (registered in the last month)
  const oneMonthAgo = subMonths(new Date(), 1);
  const newUsers = await User.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });

  // Admin vs. Regular Users (count by role)
  const adminCount = await User.countDocuments({ role: 'admin' });
  const regularUserCount = await User.countDocuments({ role: 'user' });

  const finalRes = {
    totalUsers,
    activeUsers,
    topCustomers,
    newUsers,
    adminCount,
    regularUserCount,
  };

  return JSON.parse(JSON.stringify(finalRes));

  // return {
  //   totalUsers,
  //   activeUsers,
  //   topCustomers,
  //   newUsers,
  //   adminCount,
  //   regularUserCount,
  // };
};
