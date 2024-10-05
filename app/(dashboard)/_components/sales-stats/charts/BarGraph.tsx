'use client';

import * as React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartTooltip } from '@/components/ui/chart';

export const description = 'An interactive bar chart';

type RevenueByMonth = {
  totalRevenue: number;
  month: string;
}[];

type ChartData = {
  totalRevenue: number;
  date: string;
}[];

export function BarGraph({
  revenueByMonth,
}: {
  revenueByMonth: RevenueByMonth;
}) {
  // Map your revenueByMonth to chartData with date and totalRevenue fields
  const chartData: ChartData = React.useMemo(
    () =>
      revenueByMonth.map(({ totalRevenue, month }) => ({
        totalRevenue,
        date: month,
      })),
    [revenueByMonth]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Revenue by Month</CardTitle>
          <CardDescription>
            Showing total revenue for the last few months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="aspect-auto h-[280px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                  });
                }}
              />
              <ChartTooltip
                content={({ label, payload }) => (
                  <div className="bg-white p-2 shadow-md">
                    <p>
                      {new Date(label).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <p>{payload?.[0]?.value?.toLocaleString()} USD</p>
                  </div>
                )}
              />
              <Bar dataKey="totalRevenue" fill="#eb3d00" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
