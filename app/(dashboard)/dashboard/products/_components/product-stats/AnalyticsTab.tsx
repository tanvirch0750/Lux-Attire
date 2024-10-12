import { useMemo } from 'react';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import MetricCard from './MetricCard';
import { Product } from './types';
import TopSellingSizes from './TopSellingSizes';
import ColorSalesChart from './ColorSalesChart';
import { BadgeDollarSignIcon, DollarSignIcon, RulerIcon } from 'lucide-react';

interface AnalyticsTabProps {
  product: Product;
}

export default function AnalyticsTab({ product }: AnalyticsTabProps) {
  const stockTurnoverRate = useMemo(() => {
    const totalStock = product.colors.reduce(
      (total, color) =>
        total +
        color.sizeStocks.reduce(
          (colorTotal, size) => colorTotal + size.stock,
          0
        ),
      0
    );
    return (
      (product.totalQuantitySold / (product.totalQuantitySold + totalStock)) *
      100
    ).toFixed(2);
  }, [product]);

  const colorSalesData = useMemo(() => {
    const salesByColor = product.salesData.reduce((acc, sale) => {
      if (!acc[sale.color]) {
        acc[sale.color] = { totalQuantity: 0, totalRevenue: 0 };
      }
      acc[sale.color].totalQuantity += sale.totalQuantity;
      acc[sale.color].totalRevenue += sale.totalRevenue;
      return acc;
    }, {} as Record<string, { totalQuantity: number; totalRevenue: number }>);

    return Object.entries(salesByColor).map(([color, data]) => ({
      color,
      ...data,
    }));
  }, [product.salesData]);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Quantity Sold"
          value={product.totalQuantitySold}
          icon={
            <BadgeDollarSignIcon className="h-4 w-4 text-muted-foreground" />
          }
        />
        <MetricCard
          title="Total Revenue Generated"
          value={`$${product.totalRevenueGenerated.toFixed(2)}`}
          icon={<DollarSignIcon className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Average Order Value"
          value={`$${(
            product.totalRevenueGenerated / product.totalQuantitySold
          ).toFixed(2)}`}
          icon={<RulerIcon className="h-4 w-4 text-muted-foreground" />}
        />
        <MetricCard
          title="Stock Turnover Rate"
          value={`${stockTurnoverRate}%`}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          }
          description="Sold items vs. total inventory"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ColorSalesChart colorSalesData={colorSalesData} />
        <TopSellingSizes salesData={product.salesData} />
      </div>
    </div>
  );
}
