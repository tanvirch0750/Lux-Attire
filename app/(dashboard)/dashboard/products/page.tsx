import PageContainer from '../../_components/layout/PageContainer';
import PageHeader from '../../_components/PageHeader';
import { getAllProducts } from '@/db/actions-and-queries/products/products-queries';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

// Product type

export default async function ProductPage() {
  const productsData = await getAllProducts();

  return (
    <PageContainer scrollable>
      <PageHeader
        btnLabel="Create Product"
        btnLink="/dashboard/products/create"
        heading="Products List"
      />

      <div className=" pb-10">
        <DataTable
          data={productsData?.length ? productsData : []}
          columns={columns}
        />
      </div>
    </PageContainer>
  );
}
