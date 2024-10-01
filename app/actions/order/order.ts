import {
  cancelOrder,
  createOrder,
  deliverOrder,
} from '@/db/actions-and-queries/orders/orders-action';
import { IOrder } from '@/db/models/order-model';
import { isErrorWithMessage } from '@/lib/utils';
import { Types } from 'mongoose';

export async function createOrderAction(data: IOrder, userId: string) {
  try {
    const order = await createOrder(data, userId);
    return {
      data: order,
      status: 200,
    };
  } catch (e: unknown) {
    return {
      error: isErrorWithMessage(e) ? e.message : 'Unknown error occurred',
      status: 404,
    };
  }
}

export async function cancelOrderAction(
  orderId: Types.ObjectId | string,
  userId: string
) {
  try {
    const order = await cancelOrder(orderId, userId);
    return {
      data: order,
      status: 200,
    };
  } catch (e: unknown) {
    return {
      error: isErrorWithMessage(e) ? e.message : 'Unknown error occurred',
      status: 404,
    };
  }
}

export async function deliverOrderAction(orderId: Types.ObjectId | string) {
  try {
    const order = await deliverOrder(orderId);
    return {
      data: order,
      status: 200,
    };
  } catch (e: unknown) {
    return {
      error: isErrorWithMessage(e) ? e.message : 'Unknown error occurred',
      status: 404,
    };
  }
}
