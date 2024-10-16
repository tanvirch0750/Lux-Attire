import { Order } from '@/db/models/order-model';
import { dbConnect } from '@/db/service/mongo';

export const getOrderStatistics = async (): Promise<{
  totalOrders: number;
  ordersByPaymentMethod: { paymentMethod: string; count: number }[];
  totalShippingRevenue: number;
  pendingDeliveries: number;
}> => {
  await dbConnect();

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

  const finalRes = {
    totalOrders,
    ordersByPaymentMethod,
    totalShippingRevenue: totalShippingRevenue[0]?.totalShippingRevenue || 0,
    pendingDeliveries,
  };

  return JSON.parse(JSON.stringify(finalRes));

  // return {
  //   totalOrders,
  //   ordersByPaymentMethod,
  //   totalShippingRevenue: totalShippingRevenue[0]?.totalShippingRevenue || 0,
  //   pendingDeliveries,
  // };
};
