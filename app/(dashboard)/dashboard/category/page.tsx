import PageContainer from '../../_components/layout/PageContainer';
import PageHeader from '../../_components/PageHeader';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { getAllCategories } from '@/db/actions-and-queries/category/category-queries';

export const dynamic = 'force-dynamic';

export default async function CategoryPage() {
  const data = await getAllCategories();

  return (
    <PageContainer>
      <PageHeader
        btnLabel="Create Category"
        btnLink="/dashboard/category/create"
        heading="Category List"
      />

      <div>
        <DataTable data={data?.length ? data : []} columns={columns} />
      </div>
    </PageContainer>
  );
}
