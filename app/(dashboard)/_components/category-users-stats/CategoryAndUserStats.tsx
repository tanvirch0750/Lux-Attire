import { getCategoryStatistics } from '@/db/actions-and-queries/dashboard-stats/category-stats-query';
import { getUserStatistics } from '@/db/actions-and-queries/dashboard-stats/user-stats-query';
import UserCategoryDashboard from './Chart';

export default async function UsersAndCategoryStats() {
  const userStats = await getUserStatistics();
  const categoryStats = await getCategoryStatistics();

  return (
    <UserCategoryDashboard
      // @ts-ignore
      userStats={userStats}
      // @ts-ignore
      categoryStats={categoryStats}
    />
  );
}
