import ProductImages from './ProductImages';
import { Product } from './types';
import SalesRevenueChart from './SalesRevenueChart';

interface SalesOverviewCardProps {
  product: Product;
}

export default function SalesOverviewCard({ product }: SalesOverviewCardProps) {
  return (
    <div className="col-span-full">
      <div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <SalesRevenueChart salesData={product.salesData} />
          <ProductImages images={product.images} />
        </div>
      </div>
    </div>
  );
}
