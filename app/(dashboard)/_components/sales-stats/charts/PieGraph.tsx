'use client';

import * as React from 'react';
import { Pie, PieChart, Label } from 'recharts';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

// Demo data

// Pie chart configuration (optional, can adjust colors or other settings)
const chartConfig = {
  paid: {
    label: 'Paid Orders',
    color: 'hsl(var(--chart-paid))',
  },
  unpaid: {
    label: 'Unpaid Orders',
    color: 'hsl(var(--chart-unpaid))',
  },
  cancelled: {
    label: 'Cancelled Orders',
    color: 'hsl(var(--chart-cancelled))',
  },
  delivered: {
    label: 'Delivered Orders',
    color: 'hsl(var(--chart-delivered))',
  },
  confirmed: {
    label: 'Confirmed Orders',
    color: 'hsl(var(--chart-confirmed))',
  },
} satisfies ChartConfig;

export function PieGraph({ paid, unpaid }: { paid: number; unpaid: number }) {
  const paidVsUnpaidOrders = { paid, unpaid };

  const totalOrders = paidVsUnpaidOrders.paid + paidVsUnpaidOrders.unpaid;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Status</CardTitle>
        <CardDescription>Paid vs Unpaid Orders</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel className="bg-white" />}
            />
            {/* Pie for paid vs unpaid */}
            <Pie
              data={[
                {
                  name: 'Paid',
                  value: paidVsUnpaidOrders.paid,
                  fill: '#48bb78',
                }, // green
                {
                  name: 'Unpaid',
                  value: paidVsUnpaidOrders.unpaid,
                  fill: '#f56565',
                }, // red
              ]}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={130}
              strokeWidth={5}
              cx="50%"
              cy="50%"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalOrders}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Orders
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
