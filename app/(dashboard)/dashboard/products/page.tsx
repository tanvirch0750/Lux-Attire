import { getAllCategories } from '@/db/actions-and-queries/category/category-queries';
import PageContainer from '../../_components/layout/PageContainer';
import ProductForm from './_components/CreateProductForm';
import { ICategory } from '@/db/models/category-model';

export default async function ProductListPage() {
  const categories = await getAllCategories();

  return (
    <PageContainer scrollable>
      <h2 className=" text-primary text-2xl mb-5">Create Product</h2>

      <ProductForm categories={categories as ICategory[]} />
    </PageContainer>
  );
}
