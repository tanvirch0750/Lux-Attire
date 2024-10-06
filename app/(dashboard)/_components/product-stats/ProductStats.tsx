import { getProductStatistics } from '@/db/actions-and-queries/dashboard-stats/product-stats-query';
import ProductDashboard from './charts/AllStat';

export default async function ProductStatPage() {
  const productData = await getProductStatistics();

  // @ts-ignore
  return <ProductDashboard productData={productData} />;
}
