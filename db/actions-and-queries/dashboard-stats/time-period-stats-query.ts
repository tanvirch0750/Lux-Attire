import { Order } from '@/db/models/order-model';
import { User } from '@/db/models/user-model';
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';
import { dbConnect } from '@/db/service/mongo';

// Define types for the return value structure
interface TimeBasedTrends {
  ordersOverTime: {
    _id: { date: string };
    count: number;
  }[];
  revenueOverTime: {
    _id: { date: string };
    totalAmount: number;
  }[];
  newUsersOverTime: {
    _id: { date: string };
    count: number;
  }[];
}

export const getTimeBasedTrends = async (
  period: 'daily' | 'weekly' | 'monthly'
): Promise<TimeBasedTrends> => {
  await dbConnect();

  let startOfPeriod: Date, endOfPeriod: Date, dateFormat: string;

  // Set the start and end of the period based on daily, weekly, or monthly trends
  if (period === 'daily') {
    startOfPeriod = startOfDay(new Date());
    endOfPeriod = endOfDay(new Date());
    dateFormat = '%Y-%m-%d'; // Day-based format
  } else if (period === 'weekly') {
    startOfPeriod = startOfWeek(new Date());
    endOfPeriod = endOfWeek(new Date());
    dateFormat = '%Y-%W'; // Week-based format
  } else if (period === 'monthly') {
    startOfPeriod = startOfMonth(new Date());
    endOfPeriod = endOfMonth(new Date());
    dateFormat = '%Y-%m'; // Month-based format
  } else {
    throw new Error('Invalid time period. Must be daily, weekly, or monthly.');
  }

  // 1. Orders Over Time
  const ordersOverTime = await Order.aggregate([
    {
      $match: { createdAt: { $gte: startOfPeriod, $lte: endOfPeriod } },
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: dateFormat, date: '$createdAt' },
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.date': 1 } },
  ]);

  // 2. Revenue Over Time
  const revenueOverTime = await Order.aggregate([
    {
      $match: { createdAt: { $gte: startOfPeriod, $lte: endOfPeriod } },
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: dateFormat, date: '$createdAt' },
          },
        },
        totalAmount: { $sum: '$totalPrice' },
      },
    },
    { $sort: { '_id.date': 1 } },
  ]);

  // 3. New Users Over Time
  const newUsersOverTime = await User.aggregate([
    {
      $match: { createdAt: { $gte: startOfPeriod, $lte: endOfPeriod } },
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: { format: dateFormat, date: '$createdAt' },
          },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.date': 1 } },
  ]);

  return {
    ordersOverTime,
    revenueOverTime,
    newUsersOverTime,
  };
};
