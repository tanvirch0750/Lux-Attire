'use client';

import * as React from 'react';
import { Pie, PieChart } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type OrderStatus = {
  count: number;
  status: string; // Extend with other statuses if needed
};

type OrdersByStatusProps = {
  ordersByStatus: OrderStatus[];
};

// Pie chart configuration (optional, can adjust colors or other settings)
const chartConfig = {
  cancelled: {
    label: 'Cancelled',
    color: 'hsl(var(--chart-cancelled))',
  },
  delivered: {
    label: 'Delivered',
    color: 'hsl(var(--chart-delivered))',
  },
  confirmed: {
    label: 'Confirmed',
    color: 'hsl(var(--chart-confirmed))',
  },
} satisfies ChartConfig;

export function OrderStatusDistribution({
  ordersByStatus,
}: OrdersByStatusProps) {
  // Convert the incoming data to include the `fill` property
  const formattedOrdersByStatus = ordersByStatus?.map((order) => {
    let fillColor = '';

    switch (order.status) {
      case 'cancelled':
        fillColor = '#f56565'; // red
        break;
      case 'delivered':
        fillColor = '#48bb78'; // green
        break;
      case 'confirmed':
        fillColor = '#4299e1'; // blue
        break;
      default:
        fillColor = '#cccccc'; // fallback color for unexpected statuses
        break;
    }

    return {
      ...order,
      fill: fillColor,
    };
  });

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Status Distribution</CardTitle>
        <CardDescription>Confirmed, Cancelled, Deleted Orders</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="bg-white" />}
            />
            {/* Pie for order status */}
            <Pie
              data={formattedOrdersByStatus}
              dataKey="count"
              nameKey="status"
              outerRadius={130}
              cx="50%"
              cy="50%"
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
