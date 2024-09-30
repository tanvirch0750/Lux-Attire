'use server';

import { IOrder, Order } from '@/db/models/order-model';
import { Types } from 'mongoose';
import { revalidatePath } from 'next/cache';

// Create a new order (available to all users)
export const createOrder = async (orderData: IOrder, userId: string) => {
  if (!userId) {
    throw new Error('You are not authorized');
  }

  try {
    // Check if an order with the same session_id already exists

    if (orderData.session_id) {
      const existingOrder = await Order.findOne({
        session_id: orderData.session_id,
      });
      if (existingOrder) {
        // If an order exists, return it without creating a new one
        return JSON.parse(JSON.stringify(existingOrder));
      }
    }

    // If no existing order, create a new one
    const newOrder = new Order({
      ...orderData,
      user: userId,
    });
    await newOrder.save();

    // Revalidate paths
    revalidatePath('/my-orders', 'page');
    revalidatePath('/my-orders/[id]', 'page');

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
      { _id: orderId, isDeleted: false },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      throw new Error('Order not found or is deleted');
    }
    return updatedOrder;
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

    if (!deletedOrder) {
      throw new Error('Order not found or is already deleted');
    }

    return deletedOrder;
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

    if (!restoredOrder) {
      throw new Error('Order not found or is not deleted');
    }

    return restoredOrder;
  } catch (error) {
    throw new Error(
      'Error undoing order deletion: ' + (error as Error).message
    );
  }
};

// Cancel an order (user can only cancel if order is not delivered and payment is not paid)
export const cancelOrder = async (orderId: Types.ObjectId, userId: string) => {
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
    order.status = 'canceled';
    await order.save();

    return order;
  } catch (error) {
    throw new Error('Error canceling order: ' + (error as Error).message);
  }
};
