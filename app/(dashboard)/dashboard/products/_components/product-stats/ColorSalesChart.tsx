import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

interface ColorSalesData {
  color: string;
  totalQuantity: number;
  totalRevenue: number;
}

interface ColorSalesChartProps {
  colorSalesData: ColorSalesData[];
}

export default function ColorSalesChart({
  colorSalesData,
}: ColorSalesChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Color based sales analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            quantity: {
              label: 'Quantity',
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
            <BarChart data={colorSalesData}>
              <XAxis dataKey="color" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip
                content={<ChartTooltipContent className=" bg-white" />}
              />
              <Bar
                yAxisId="left"
                dataKey="totalQuantity"
                fill="var(--color-quantity)"
              />
              <Bar
                yAxisId="right"
                dataKey="totalRevenue"
                fill="var(--color-revenue)"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
