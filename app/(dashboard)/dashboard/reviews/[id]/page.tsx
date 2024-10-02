import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';
import PageHeader from '@/app/(dashboard)/_components/PageHeader';
import { getReviewsByProductAdmin } from '@/db/actions-and-queries/reviews/review-query';
import { DataTable } from '../_components/data-table';
import { columns } from '../_components/columns';

// Product type

export default async function ReviesPage({
  params,
}: {
  params: { id: string };
}) {
  const reviewsData = await getReviewsByProductAdmin(params?.id);

  return (
    <PageContainer scrollable>
      <PageHeader
        heading={`${reviewsData?.length} reviews found`}
        btnLabel="Products"
        btnLink="/dashboard/reviews"
      />

      <div className=" pb-10">
        <DataTable
          data={reviewsData?.length ? reviewsData : []}
          columns={columns}
        />
      </div>
    </PageContainer>
  );
}
