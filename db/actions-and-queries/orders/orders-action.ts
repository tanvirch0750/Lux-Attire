'use server';

import { IOrder, Order } from '@/db/models/order-model';
import mongoose, { Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from 'next/cache';
import { dbConnect } from '@/db/service/mongo';
import { Product } from '@/db/models/product-model';

// update product stock function
const updateProductStock = async (
  productId: string,
  color: string,
  size: string,
  quantity: number,
  session: mongoose.ClientSession // Pass session for transaction
) => {
  try {
    // Find the product by its ID within the session
    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new Error('Product not found');
    }

    // Find the color inside the colors array
    const colorStock = product.colors.find(
      (col: { name: string }) =>
        col.name.toLocaleLowerCase() === color.toLocaleLowerCase()
    );
    if (!colorStock) {
      throw new Error(`Color ${color} not found`);
    }

    // Find the size inside the sizeStocks array for the selected color
    const sizeStock = colorStock.sizeStocks.find(
      (sz: { size: string }) =>
        sz.size.toLocaleLowerCase() === size.toLocaleLowerCase()
    );
    if (!sizeStock) {
      throw new Error(`Size ${size} not found for color ${color}`);
    }

    // Decrease the stock by the order quantity
    if (sizeStock.stock < quantity) {
      throw new Error(`Not enough stock for size ${size} and color ${color}`);
    }

    sizeStock.stock -= quantity;

    // Mark as unavailable if the stock reaches 0
    if (sizeStock.stock === 0) {
      sizeStock.isAvailable = false;
    }

    // Save the updated product within the session
    await product.save({ session });
  } catch (error) {
    throw new Error(
      'Error updating product stock: ' + (error as Error).message
    );
  }
};

export const createOrder = async (orderData: IOrder, userId: string) => {
  await dbConnect();

  if (!userId) {
    throw new Error('You are not authorized');
  }

  // Start a session for the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // If a session_id is provided (e.g., for Stripe), check for an existing order
    if (orderData.session_id) {
      const existingOrder = await Order.findOne({
        session_id: orderData.session_id,
      }).session(session);

      if (existingOrder) {
        console.log('session id found');
        // If an order exists, return it without creating a new one
        return JSON.parse(JSON.stringify(existingOrder));
      }
    }

    // Create the new session ID if paymentMethod is 'cashOnDelivery'
    if (orderData.paymentMethod === 'cashOnDelivery') {
      orderData.session_id = uuidv4(); // Generate a new UUID as session_id
    }

    // Create the new order
    const newOrderData = {
      ...orderData,
      user: userId,
    };

    const newOrder = new Order(newOrderData);

    // Save the order with the session
    await newOrder.save({ session });

    // Update stock for each order item inside the transaction
    for (const orderItem of newOrder.orderItems) {
      await updateProductStock(
        orderItem.productId,
        orderItem.color,
        orderItem.size,
        orderItem.quantity,
        session
      );
    }

    // If all operations are successful, commit the transaction
    await session.commitTransaction();
    session.endSession();

    // Revalidate paths
    revalidatePath('/my-orders', 'page');
    revalidatePath('/my-orders/[id]', 'page');
    revalidatePath('/dashboard/orders', 'page');
    revalidatePath('/dashboard/orders/[id]', 'page');
    revalidatePath('/dashboard/products/edit/[id]', 'page');

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    // If any error occurs, abort the transaction
    await session.abortTransaction();
    session.endSession();
    throw new Error('Error creating order: ' + (error as Error).message);
  }
};

// Update an order by ID (only admin can update order status)
export const updateOrderById = async (
  orderId: Types.ObjectId,
  updateData: Partial<IOrder>
) => {
  await dbConnect();
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
export const deleteOrderById = async (orderId: Types.ObjectId) => {
  await dbConnect();

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
export const undoDeleteOrder = async (orderId: Types.ObjectId) => {
  await dbConnect();

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

// increase product stock incase of cancel order
const increaseProductStock = async (
  productId: string,
  color: string,
  size: string,
  quantity: number,
  session: mongoose.ClientSession // Pass session for transaction
) => {
  try {
    // Find the product by its ID within the session
    const product = await Product.findById(productId).session(session);
    if (!product) {
      throw new Error('Product not found');
    }

    // Find the color inside the colors array
    const colorStock = product.colors.find(
      (col: { name: string }) =>
        col.name.toLocaleLowerCase() === color.toLocaleLowerCase()
    );
    if (!colorStock) {
      throw new Error(`Color ${color} not found`);
    }

    // Find the size inside the sizeStocks array for the selected color
    const sizeStock = colorStock.sizeStocks.find(
      (sz: { size: string }) =>
        sz.size.toLocaleLowerCase() === size.toLocaleLowerCase()
    );
    if (!sizeStock) {
      throw new Error(`Size ${size} not found for color ${color}`);
    }

    // Increase the stock by the canceled order quantity
    sizeStock.stock += quantity;

    // Mark as available if stock becomes greater than 0
    if (sizeStock.stock > 0) {
      sizeStock.isAvailable = true;
    }

    // Save the updated product within the session
    await product.save({ session });
  } catch (error) {
    throw new Error(
      `Error increasing product stock:` + (error as Error).message
    );
  }
};

// Cancel an order (user can only cancel if order is not delivered and payment is not paid)
export const cancelOrder = async (
  orderId: Types.ObjectId | string,
  userId: string
) => {
  await dbConnect();

  // Start a session for the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the order to cancel, ensuring it's not deleted
    const order = await Order.findOne({
      _id: orderId,
      user: userId,
      isDeleted: false,
    }).session(session);

    if (!order) {
      throw new Error('Order not found or is deleted');
    }

    // Ensure the order is not delivered and payment is not made
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
    await order.save({ session });

    // Increase stock for each canceled order item
    for (const orderItem of order.orderItems) {
      await increaseProductStock(
        orderItem.productId,
        orderItem.color,
        orderItem.size,
        orderItem.quantity,
        session
      );
    }

    // Commit the transaction if all goes well
    await session.commitTransaction();
    session.endSession();

    // Revalidate paths for caching (if applicable)
    revalidatePath('/my-orders', 'page');
    revalidatePath('/my-orders/[id]', 'page');
    revalidatePath('/dashboard/orders', 'page');
    revalidatePath('/dashboard/orders/[id]', 'page');
    revalidatePath('/dashboard/products/edit/[id]', 'page');

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    // Abort transaction in case of any error
    await session.abortTransaction();
    session.endSession();
    throw new Error('Error canceling order: ' + (error as Error).message);
  }
};

export const deliverOrder = async (orderId: Types.ObjectId | string) => {
  await dbConnect();
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

    // Set order status to delivered and mark it as delivered
    order.orderStatus = 'delivered';
    order.isPaid = true;
    order.deliveredAt = new Date().toISOString();
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
