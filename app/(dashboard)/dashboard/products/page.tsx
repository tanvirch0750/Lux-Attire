import PageContainer from '../../_components/layout/PageContainer';
import ProductForm from './_components/CreateProductForm';

export default function ProductListPage() {
  return (
    <PageContainer>
      <h2 className=" text-primary text-2xl mb-5">Create Product</h2>

      <ProductForm />
    </PageContainer>
  );
}
