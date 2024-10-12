import MetricCard from './MetricCard';

import ProductDetails from './ProductDetails';

import { Product } from './types';
import ColorSizeAvailability from './ColorSizeAvailability';
import SalesOverviewCard from './SalesOverviewCard';
import {
  BadgeDollarSignIcon,
  DollarSignIcon,
  Grid2x2,
  Layers,
} from 'lucide-react';

interface OverviewTabProps {
  product: Product;
}

export default function OverviewTab({ product }: OverviewTabProps) {
  const totalSales = product.salesData.reduce(
    (acc, sale) => acc + sale.totalQuantity,
    0
  );
  const totalRevenue = product.salesData.reduce(
    (acc, sale) => acc + sale.totalRevenue,
    0
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Sales"
          value={totalSales}
          icon={
            <BadgeDollarSignIcon className="h-4 w-4 text-muted-foreground" />
          }
        />
        <MetricCard
          title="Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          icon={<DollarSignIcon className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="In Stock"
          value={product.isAvailable ? 'Yes' : 'No'}
          icon={<Layers className="h-4 w-4 text-muted-foreground" />}
          description={
            product.isAvailable
              ? 'Product is available'
              : 'Product is out of stock'
          }
        />
        <MetricCard
          title="Category"
          value={product.categoryDetails.label}
          icon={<Grid2x2 className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <SalesOverviewCard product={product} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ProductDetails product={product} />
        <ColorSizeAvailability colors={product.colors} />
      </div>
    </div>
  );
}
