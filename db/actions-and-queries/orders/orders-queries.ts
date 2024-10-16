import { Order } from '@/db/models/order-model';
import { Types } from 'mongoose';
import { dbConnect } from '@/db/service/mongo';

// Get all orders (available to admin only)
export const getAllOrders = async () => {
  await dbConnect();
  try {
    const orders = await Order.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .populate('user');
    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    throw new Error('Error fetching orders: ' + (error as Error).message);
  }
};

// Get orders for a specific user
export const getUserOrders = async (userId: string) => {
  await dbConnect();
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

// Get recent 5 orders (available to admin only)
export const getRecentOrders = async () => {
  await dbConnect();
  try {
    const recentOrders = await Order.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user');
    return JSON.parse(JSON.stringify(recentOrders));
  } catch (error) {
    throw new Error(
      'Error fetching recent orders: ' + (error as Error).message
    );
  }
};

// Get a single order by its ID (available to admin or the user who placed the order)
export const getOrderById = async (
  orderId: Types.ObjectId | string,
  userId: string
) => {
  await dbConnect();
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

export const getAdminOrderById = async (orderId: Types.ObjectId | string) => {
  await dbConnect();
  try {
    // Allow only admins or the user who placed the order to fetch the order details
    const order = await Order.findOne({
      _id: orderId,
    }).populate('user');

    if (!order) {
      throw new Error('Order not found or is deleted');
    }

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    throw new Error('Error fetching order: ' + (error as Error).message);
  }
};
