import PageContainer from '../../_components/layout/PageContainer';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { getAllOrders } from '@/db/actions-and-queries/orders/orders-queries';

export const dynamic = 'force-dynamic';

export default async function OrderPage() {
  const ordersData = await getAllOrders();

  return (
    <PageContainer>
      <div className=" flex justify-between items-center pb-12">
        <h2 className=" text-primary text-2xl">All Orders</h2>
      </div>

      <div className=" pb-10">
        <DataTable
          data={ordersData?.length ? ordersData : []}
          columns={columns}
        />
      </div>
    </PageContainer>
  );
}
