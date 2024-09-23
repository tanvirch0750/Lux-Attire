import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';
import CreateCategoryForm from '../_components/CreateCategoryForm';
import PageHeader from '@/app/(dashboard)/_components/PageHeader';

export default function CreateCategoryPage() {
  return (
    <PageContainer>
      <PageHeader
        btnLabel="Category List"
        btnLink="/dashboard/category"
        heading="Create Category"
      />

      <CreateCategoryForm />
    </PageContainer>
  );
}
