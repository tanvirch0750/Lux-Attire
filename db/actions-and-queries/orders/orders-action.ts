'use server';

import { IOrder, Order } from '@/db/models/order-model';
import { Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';

// Create a new order (available to all users)
export const createOrder = async (orderData: IOrder, userId: string) => {
  if (!userId) {
    throw new Error('You are not authorized');
  }

  try {
    // If a session_id is provided (e.g., for Stripe), check for an existing order
    if (orderData.session_id) {
      const existingOrder = await Order.findOne({
        session_id: orderData.session_id,
      });
      if (existingOrder) {
        // If an order exists, return it without creating a new one
        return JSON.parse(JSON.stringify(existingOrder));
      }
    }

    // Create a new session ID if paymentMethod is 'cash'
    if (orderData.paymentMethod === 'cashOnDelivery') {
      orderData.session_id = uuidv4(); // Generate a new UUID as session_id
    }

    // Create the new order
    const newOrderData = {
      ...orderData,
      user: userId,
    };

    const newOrder = new Order(newOrderData);
    await newOrder.save();

    // Revalidate paths
    revalidatePath('/my-orders', 'page');
    revalidatePath('/my-orders/[id]', 'page');
    revalidatePath('/dashboard/orders', 'page');
    revalidatePath('/dashboard/orders/[id]', 'page');

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    throw new Error('Error creating order: ' + (error as Error).message);
  }
};

// Update an order by ID (only admin can update order status)
export const updateOrderById = async (
  orderId: Types.ObjectId,
  updateData: Partial<IOrder>
) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { _id: orderId },
      updateData,
      { new: true, runValidators: true }
    );

    // Revalidate paths
    revalidatePath('/my-orders', 'page');
    revalidatePath('/my-orders/[id]', 'page');
    revalidatePath('/dashboard/orders', 'page');
    revalidatePath('/dashboard/orders/[id]', 'page');

    if (!updatedOrder) {
      throw new Error('Order not found or is deleted');
    }
    return JSON.parse(JSON.stringify(updatedOrder));
  } catch (error) {
    throw new Error('Error updating order: ' + (error as Error).message);
  }
};

// Soft delete an order by updating isDeleted to true (only admin can delete)
export const deleteOrderById = async (
  orderId: Types.ObjectId,
  role: string
) => {
  if (role !== 'admin') {
    throw new Error('Only admins can delete orders');
  }

  try {
    const deletedOrder = await Order.findOneAndUpdate(
      { _id: orderId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    // Revalidate paths
    revalidatePath('/my-orders', 'page');
    revalidatePath('/my-orders/[id]', 'page');
    revalidatePath('/dashboard/orders', 'page');
    revalidatePath('/dashboard/orders/[id]', 'page');

    if (!deletedOrder) {
      throw new Error('Order not found or is already deleted');
    }

    return JSON.parse(JSON.stringify(deletedOrder));
  } catch (error) {
    throw new Error('Error deleting order: ' + (error as Error).message);
  }
};

// Undo delete functionality by setting isDeleted to false (only admin can undo delete)
export const undoDeleteOrder = async (
  orderId: Types.ObjectId,
  role: string
) => {
  if (role !== 'admin') {
    throw new Error('Only admins can undo order deletion');
  }

  try {
    const restoredOrder = await Order.findOneAndUpdate(
      { _id: orderId, isDeleted: true },
      { isDeleted: false },
      { new: true }
    );

    // Revalidate paths
    revalidatePath('/my-orders', 'page');
    revalidatePath('/my-orders/[id]', 'page');
    revalidatePath('/dashboard/orders', 'page');
    revalidatePath('/dashboard/orders/[id]', 'page');

    if (!restoredOrder) {
      throw new Error('Order not found or is not deleted');
    }

    return JSON.parse(JSON.stringify(restoredOrder));
  } catch (error) {
    throw new Error(
      'Error undoing order deletion: ' + (error as Error).message
    );
  }
};

// Cancel an order (user can only cancel if order is not delivered and payment is not paid)
export const cancelOrder = async (
  orderId: Types.ObjectId | string,
  userId: string
) => {
  try {
    const order = await Order.findOne({
      _id: orderId,
      user: userId,
      isDeleted: false,
    });

    if (!order) {
      throw new Error('Order not found or is deleted');
    }

    if (order.isDelivered) {
      throw new Error(
        'Order has already been delivered and cannot be canceled'
      );
    }

    if (order.isPaymentPaid) {
      throw new Error(
        'Payment has already been made for this order and it cannot be canceled'
      );
    }

    // Set order status to canceled
    order.orderStatus = 'cancelled';
    await order.save();

    // Revalidate paths
    revalidatePath('/my-orders', 'page');
    revalidatePath('/my-orders/[id]', 'page');
    revalidatePath('/dashboard/orders', 'page');
    revalidatePath('/dashboard/orders/[id]', 'page');

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    throw new Error('Error canceling order: ' + (error as Error).message);
  }
};

export const deliverOrder = async (orderId: Types.ObjectId | string) => {
  try {
    // Find the order by ID, user, and ensure it's not deleted
    const order = await Order.findOne({
      _id: orderId,
      isDeleted: false,
    });

    // Check if the order exists and is not already delivered
    if (!order) {
      throw new Error('Order not found or is deleted');
    }

    if (order.isDelivered) {
      throw new Error('Order has already been delivered');
    }

    // Set order status to delivered and mark it as delivered
    order.orderStatus = 'delivered';
    order.deliveredAt = new Date();
    await order.save();

    // Revalidate paths
    revalidatePath('/my-orders', 'page');
    revalidatePath('/my-orders/[id]', 'page');
    revalidatePath('/dashboard/orders', 'page');
    revalidatePath('/dashboard/orders/[id]', 'page');

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    throw new Error('Error delivering order: ' + (error as Error).message);
  }
};
