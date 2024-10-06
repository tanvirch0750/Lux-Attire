'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { Users, ShoppingBag, Tag } from 'lucide-react';

type UserStatistics = {
  totalUsers: number;
  activeUsers: number;
  topCustomers: Array<{
    _id: string;
    totalSpent: number;
    userId: string;
    userName: string;
  }>;
  newUsers: number;
  adminCount: number;
  regularUserCount: number;
};

type CategoryStatistics = {
  totalCategories: number;
  mostPopularCategory: {
    categoryId: string;
    categoryName: string;
    totalSold: number;
  };
};

interface DashboardProps {
  userStats: UserStatistics;
  categoryStats: CategoryStatistics;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const UserTypePieChart = ({
  adminCount,
  regularUserCount,
}: {
  adminCount: number;
  regularUserCount: number;
}) => {
  const data = [
    { name: 'Admin Users', value: adminCount },
    { name: 'Regular Users', value: regularUserCount },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Types</CardTitle>
        <CardDescription>
          Distribution of admin and regular users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const TopCustomersBarChart = ({
  data,
}: {
  data: Array<{ userName: string; totalSpent: number }>;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Top Customers</CardTitle>
      <CardDescription>Customers with highest total spend</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="userName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpent" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default function UserCategoryDashboard({
  userStats,
  categoryStats,
}: DashboardProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.newUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {categoryStats?.totalCategories}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <UserTypePieChart
          adminCount={userStats?.adminCount}
          regularUserCount={userStats?.regularUserCount}
        />
        <TopCustomersBarChart data={userStats?.topCustomers} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Most Popular Category</CardTitle>
          <CardDescription>
            Category with the highest number of sales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                {categoryStats?.mostPopularCategory?.categoryName}
              </p>
              <p className="text-sm text-muted-foreground">
                Total Sold: {categoryStats?.mostPopularCategory?.totalSold}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
