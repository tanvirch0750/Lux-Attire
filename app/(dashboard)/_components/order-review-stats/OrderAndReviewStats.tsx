import { getOrderStatistics } from '@/db/actions-and-queries/dashboard-stats/order-stats-query';
import { getReviewStatistics } from '@/db/actions-and-queries/dashboard-stats/review-stats-query';
import OrderReviewDashboard from './Chart';

export default async function OrderAndReviewStats() {
  const orderStats = await getOrderStatistics();
  const reviewStats = await getReviewStatistics();

  return (
    // @ts-ignore
    <OrderReviewDashboard orderStats={orderStats} reviewStats={reviewStats} />
  );
}
