import { Order } from '@/db/models/order-model';

// Function to get all sales and revenue statistics
export const getAllSalesStatistics = async (): Promise<{
  totalRevenue: number;
  averageOrderValue: number;
  totalOrders: number;
  paidVsUnpaidOrders: { paid: number; unpaid: number };
  ordersByStatus: { status: string; count: number }[];
  revenueByMonth: { month: string; totalRevenue: number }[];
}> => {
  // Total Revenue
  const totalRevenuePromise = Order.aggregate([
    { $match: { isPaid: true } },
    { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
  ]);

  // Average Order Value
  const averageOrderValuePromise = Order.aggregate([
    { $match: { isPaid: true } },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
        totalOrders: { $sum: 1 },
      },
    },
  ]);

  // Total Orders
  const totalOrdersPromise = Order.countDocuments();

  // Paid vs Unpaid Orders
  const paidOrdersPromise = Order.countDocuments({ isPaid: true });
  const unpaidOrdersPromise = Order.countDocuments({ isPaid: false });

  // Orders by Status
  const ordersByStatusPromise = Order.aggregate([
    { $group: { _id: '$orderStatus', count: { $sum: 1 } } },
    { $project: { _id: 0, status: '$_id', count: 1 } },
  ]);

  // Revenue by Month
  const revenueByMonthPromise = Order.aggregate([
    { $match: { isPaid: true } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
    { $project: { _id: 0, month: '$_id', totalRevenue: 1 } },
    { $sort: { month: 1 } },
  ]);

  // Execute all promises concurrently
  const [
    totalRevenueResult,
    averageOrderValueResult,
    totalOrders,
    paidOrders,
    unpaidOrders,
    ordersByStatus,
    revenueByMonth,
  ] = await Promise.all([
    totalRevenuePromise,
    averageOrderValuePromise,
    totalOrdersPromise,
    paidOrdersPromise,
    unpaidOrdersPromise,
    ordersByStatusPromise,
    revenueByMonthPromise,
  ]);

  // Compute total revenue
  const totalRevenue =
    totalRevenueResult.length > 0 ? totalRevenueResult[0].totalRevenue : 0;

  // Compute average order value
  const averageOrderValue =
    averageOrderValueResult.length > 0 &&
    averageOrderValueResult[0].totalOrders > 0
      ? averageOrderValueResult[0].totalRevenue /
        averageOrderValueResult[0].totalOrders
      : 0;

  return {
    totalRevenue,
    averageOrderValue,
    totalOrders,
    paidVsUnpaidOrders: {
      paid: paidOrders,
      unpaid: unpaidOrders,
    },
    ordersByStatus,
    revenueByMonth,
  };

  
};
