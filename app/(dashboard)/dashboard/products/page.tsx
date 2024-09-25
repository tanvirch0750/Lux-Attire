import PageContainer from '../../_components/layout/PageContainer';
import PageHeader from '../../_components/PageHeader';
import { getAllProducts } from '@/db/actions-and-queries/products/products-queries';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

export default async function ProductPage() {
  const productsData = await getAllProducts();
  const simplifiedData = productsData?.map((product) => ({
    _id: product?._id,
    category: product?.category ? product.category.label : null,
    name: product?.name,
    price: product?.price,
    isAvailable: product?.isAvailable,
    image: product?.images[0]?.imageSrc,
    isDeleted: product?.isDeleted,
  }));

  return (
    <PageContainer scrollable>
      <PageHeader
        btnLabel="Create Product"
        btnLink="/dashboard/products/create"
        heading="Products List"
      />

      <div className=" pb-10">
        <DataTable
          data={simplifiedData?.length ? simplifiedData : []}
          columns={columns}
        />
      </div>
    </PageContainer>
  );
}
