import { getAllCategories } from '@/db/actions-and-queries/category/category-queries';

import { ICategory } from '@/db/models/category-model';
import PageHeader from '@/app/(dashboard)/_components/PageHeader';
import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';
import ProductForm from '../_components/CreateProductForm';

export default async function CreateProductPage() {
  const categories = await getAllCategories();

  return (
    <PageContainer>
      <PageHeader
        btnLabel="Product List"
        btnLink="/dashboard/products"
        heading="Create Product"
      />

      <ProductForm categories={categories as ICategory[]} />
    </PageContainer>
  );
}
