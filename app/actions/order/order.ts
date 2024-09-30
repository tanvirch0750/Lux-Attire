import { createOrder } from '@/db/actions-and-queries/orders/orders-action';
import { IOrder } from '@/db/models/order-model';
import { isErrorWithMessage } from '@/lib/utils';

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
