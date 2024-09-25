import PageHeader from '@/app/(dashboard)/_components/PageHeader';
import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';
import UpdateCategoryForm from '../_components/UpdateCategoryForm';
import { getCategoryById } from '@/db/actions-and-queries/category/category-queries';
import { Types } from 'mongoose';

export default async function UpdateCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const category = await getCategoryById(
    params?.id as unknown as Types.ObjectId
  );

  const data = {
    id: category?._id,
    label: category?.label,
    value: category?.value,
  };

  return (
    <PageContainer scrollable>
      <PageHeader
        btnLabel="Category List"
        btnLink="/dashboard/category"
        heading="Update Category"
      />
      <UpdateCategoryForm initialData={data} />
    </PageContainer>
  );
}
