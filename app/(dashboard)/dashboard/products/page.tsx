import PageContainer from '../../_components/layout/PageContainer';
import PageHeader from '../../_components/PageHeader';
import { getAllProducts } from '@/db/actions-and-queries/products/products-queries';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';

// Product type
interface Product {
  _id: string;
  category?: { label: string };
  name: string;
  price: number;
  isAvailable: boolean;
  images?: { imageSrc: string }[];
  isDeleted: boolean;
}

export default async function ProductPage() {
  const productsData = await getAllProducts();
  const simplifiedData = productsData?.map((product: Product) => ({
    _id: product?._id,
    category: product?.category ? product.category.label : null,
    name: product?.name,
    price: product?.price,
    isAvailable: product?.isAvailable,
    image: product.images?.length ? product.images[0].imageSrc : null,
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
