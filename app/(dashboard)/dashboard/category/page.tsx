import PageContainer from '../../_components/layout/PageContainer';
import CreateCategoryForm from './_components/CreateCategoryForm';

export default function CategoryPage() {
  return (
    <PageContainer>
      <h2 className=" text-primary text-2xl mb-5">Create Category</h2>

      <CreateCategoryForm />
    </PageContainer>
  );
}
