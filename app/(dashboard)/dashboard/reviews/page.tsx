import PageContainer from '../../_components/layout/PageContainer';
import PageHeader from '../../_components/PageHeader';
import { getAllProducts } from '@/db/actions-and-queries/products/products-queries';

import { TProduct } from '@/db/models/product-model';
import { DataTable } from '../products/_components/data-table';
import { productcolumns } from './_components/productColumns';

// Product type

export const dynamic = 'force-dynamic';

export default async function ReviesPage() {
  const productsData = await getAllProducts();

  const simplifiedData = productsData?.map((product: TProduct) => ({
    _id: product?._id,
    category: product?.category ? product.category.label : null,
    name: product?.name,
    price: product?.price,
    isAvailable: product?.isAvailable,
    image: product?.images[0]?.imageSrc,
    isDeleted: product?.isDeleted,
  }));

  return (
    <PageContainer>
      <PageHeader heading="Products List for Reviews" />

      <div className=" pb-10">
        <DataTable
          data={simplifiedData?.length ? simplifiedData : []}
          columns={productcolumns}
        />
      </div>
    </PageContainer>
  );
}
