import { Order } from '@/db/models/order-model';
import { Types } from 'mongoose';

// Get all orders (available to admin only)
export const getAllOrders = async (role: string) => {
  if (role !== 'admin') {
    throw new Error('Only admins can view all orders');
  }

  try {
    const orders = await Order.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate('user');
    return orders;
  } catch (error) {
    throw new Error('Error fetching orders: ' + (error as Error).message);
  }
};

// Get orders for a specific user
export const getUserOrders = async (userId: string) => {
  try {
    const orders = await Order.find({
      user: userId,
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .populate('user');
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    throw new Error('Error fetching user orders: ' + (error as Error).message);
  }
};

// Get a single order by its ID (available to admin or the user who placed the order)
export const getOrderById = async (
  orderId: Types.ObjectId | string,
  userId: string
) => {
  try {
    // Allow only admins or the user who placed the order to fetch the order details
    const order = await Order.findOne({
      _id: orderId,
      $or: [{ user: userId }],
      isDeleted: false,
    }).populate('user');

    if (!order) {
      throw new Error('Order not found or is deleted');
    }

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    throw new Error('Error fetching order: ' + (error as Error).message);
  }
};
