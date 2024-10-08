import Link from 'next/link';
import { OrdersTable } from '../_components/my-orders/OrdersTable';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { auth } from '@/auth';
import { getUserByEmail } from '@/db/actions-and-queries/user/user-query';
import { getUserOrders } from '@/db/actions-and-queries/orders/orders-queries';
import { IOrder } from '@/db/models/order-model';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function MyOrdersPage() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);

  if (user?.role !== 'user') {
    redirect('/unauthorized');
  }

  const orders: IOrder[] = await getUserOrders(user?._id);

  return (
    <div className=" border-t p-6 mb-20">
      <MaxWidthWrapper>
        <div className=" mb-8 border-b pb-4 flex items-center justify-between">
          <h2 className=" text-2xl">My Orders</h2>
          <Link href="/products">
            <Button size="sm" className=" bg-brand">
              Continue Shopping
            </Button>
          </Link>
        </div>
        <OrdersTable orders={orders} />
      </MaxWidthWrapper>
    </div>
  );
}
