import { Order } from '@/db/models/order-model';

export const getOrderStatistics = async (): Promise<{
  totalOrders: number;
  ordersByPaymentMethod: { paymentMethod: string; count: number }[];
  totalShippingRevenue: number;
  pendingDeliveries: number;
}> => {
  // Total Orders
  const totalOrders = await Order.countDocuments({ isDeleted: false });

  // Orders by Payment Method
  const ordersByPaymentMethod = await Order.aggregate([
    {
      $group: {
        _id: '$paymentMethod',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        paymentMethod: '$_id',
        count: 1,
        _id: 0,
      },
    },
  ]);

  // Total Shipping Revenue
  const totalShippingRevenue = await Order.aggregate([
    { $group: { _id: null, totalShippingRevenue: { $sum: '$shippingPrice' } } },
  ]);

  // Pending Deliveries (orderStatus = 'confirmed' && deliveredAt = empty)
  const pendingDeliveries = await Order.countDocuments({
    orderStatus: 'confirmed',
    deliveredAt: '',
    isDeleted: false,
  });

  return {
    totalOrders,
    ordersByPaymentMethod,
    totalShippingRevenue: totalShippingRevenue[0]?.totalShippingRevenue || 0,
    pendingDeliveries,
  };
};
