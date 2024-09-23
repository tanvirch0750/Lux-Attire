import { Button } from '@/components/ui/button';
import PageContainer from '../../_components/layout/PageContainer';
import CreateCategoryForm from './_components/CreateCategoryForm';
import Link from 'next/link';
import PageHeader from '../../_components/PageHeader';
import { DataTable } from './_components/data-table';
import { ICategory } from '@/db/models/category-model';
import { columns } from './_components/columns';

const data: ICategory[] = [
  {
    label: 'Womel Collection',
    value: 'women-collection',
  },
  {
    label: 'Men Collection',
    value: 'men-collection',
  },
  {
    label: 'Kids Collection',
    value: 'kids-collection',
  },
];

export default function CategoryPage() {
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
