import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

interface SalesData {
  totalQuantity: number;
  totalRevenue: number;
  color: string;
  size: string;
}

interface SalesRevenueChartProps {
  salesData: SalesData[];
}

export default function SalesRevenueChart({
  salesData,
}: SalesRevenueChartProps) {
  const groupedData = useMemo(() => {
    const groupedByColor = salesData.reduce((acc, curr) => {
      if (!acc[curr.color]) {
        acc[curr.color] = {
          color: curr.color,
          totalQuantity: 0,
          totalRevenue: 0,
        };
      }
      acc[curr.color].totalQuantity += curr.totalQuantity;
      acc[curr.color].totalRevenue += curr.totalRevenue;
      return acc;
    }, {} as Record<string, { color: string; totalQuantity: number; totalRevenue: number }>);

    return Object.values(groupedByColor);
  }, [salesData]);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Sales and Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            sales: {
              label: 'Sales',
              color: 'hsl(var(--chart-1))',
            },
            revenue: {
              label: 'Revenue',
              color: 'hsl(var(--chart-2))',
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={groupedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="color" />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="var(--color-sales)"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="var(--color-revenue)"
              />
              <ChartTooltip
                content={<ChartTooltipContent className=" bg-white" />}
              />
              <Bar
                yAxisId="left"
                dataKey="totalQuantity"
                fill="var(--color-sales)"
                name="Sales"
              />
              <Bar
                yAxisId="right"
                dataKey="totalRevenue"
                fill="var(--color-revenue)"
                name="Revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
