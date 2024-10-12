import { Layers, Layers2Icon, Layers3Icon, LayersIcon } from 'lucide-react';
import InventoryStatus from './InventoryStatus';
import MetricCard from './MetricCard';
import { Product } from './types';

interface InventoryTabProps {
  product: Product;
}

export default function InventoryTab({ product }: InventoryTabProps) {
  const totalStock = product.colors.reduce(
    (total, color) =>
      total +
      color.sizeStocks.reduce((colorTotal, size) => colorTotal + size.stock, 0),
    0
  );

  const lowStockCount = product.colors.reduce(
    (total, color) =>
      total + color.sizeStocks.filter((size) => size.stock < 10).length,
    0
  );

  const outOfStockCount = product.colors.reduce(
    (total, color) =>
      total + color.sizeStocks.filter((size) => size.stock === 0).length,
    0
  );

  const restockNeededCount = product.colors.reduce(
    (total, color) =>
      total + color.sizeStocks.filter((size) => size.stock < 5).length,
    0
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Stock"
          value={totalStock}
          icon={<Layers className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Low Stock Alert"
          value={lowStockCount}
          icon={<Layers2Icon className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Out of Stock"
          value={outOfStockCount}
          icon={<Layers3Icon className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Restock Needed"
          value={restockNeededCount}
          icon={<LayersIcon className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <InventoryStatus colors={product.colors} />
    </div>
  );
}
