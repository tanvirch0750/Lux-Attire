import Link from 'next/link';
import { OrdersTable } from '../_components/my-orders/OrdersTable';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function MyOrdersPage() {
  return (
    <div className=" border-t p-6">
      <MaxWidthWrapper>
        <h2 className=" text-2xl mb-8 border-b pb-4">My Orders</h2>
        <OrdersTable />
      </MaxWidthWrapper>
    </div>
  );
}
