import PageContainer from '../../_components/layout/PageContainer';
import PageHeader from '../../_components/PageHeader';
import { DataTable } from './_components/data-table';
import { columns } from './_components/columns';
import { getAllUsers } from '@/db/actions-and-queries/user/user-query';

export const dynamic = 'force-dynamic';

export default async function ProductPage() {
  const usersData = await getAllUsers();

  return (
    <PageContainer scrollable>
      <PageHeader heading="Users List" />

      <div className=" pb-10">
        <DataTable
          data={usersData?.length ? usersData : []}
          columns={columns}
        />
      </div>
    </PageContainer>
  );
}
