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
import { Package, DollarSign, Truck, Star } from 'lucide-react';

type OrderStatistics = {
  totalOrders: number;
  ordersByPaymentMethod: Array<{ count: number; paymentMethod: string }>;
  totalShippingRevenue: number;
  pendingDeliveries: number;
};

type ReviewStatistics = {
  totalReviews: number;
  averageRating: number;
  mostReviewedProducts: Array<{
    _id: string;
    reviewCount: number;
    productId: string;
    productName: string;
  }>;
  topRatedProducts: Array<{
    _id: string;
    averageRating: number;
    productId: string;
    productName: string;
  }>;
};

interface DashboardProps {
  orderStats: OrderStatistics;
  reviewStats: ReviewStatistics;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const PaymentMethodPieChart = ({
  data,
}: {
  data: Array<{ count: number; paymentMethod: string }>;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Payment Methods</CardTitle>
      <CardDescription>Distribution of payment methods used</CardDescription>
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
            dataKey="count"
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

const ProductReviewsBarChart = ({
  data,
}: {
  data: Array<{ productName: string; reviewCount: number }>;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Most Reviewed Products</CardTitle>
      <CardDescription>Products with the most reviews</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="reviewCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export default function OrderReviewDashboard({
  orderStats,
  reviewStats,
}: DashboardProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats?.totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Shipping Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${orderStats?.totalShippingRevenue.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Deliveries
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orderStats?.pendingDeliveries}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviewStats.averageRating.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              From {reviewStats?.totalReviews} reviews
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <PaymentMethodPieChart data={orderStats?.ordersByPaymentMethod} />
        <ProductReviewsBarChart data={reviewStats?.mostReviewedProducts} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Top Rated Products</CardTitle>
          <CardDescription>
            Products with the highest average ratings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewStats?.topRatedProducts?.map((product) => (
              <div key={product._id} className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {product?.productName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Average Rating: {product?.averageRating?.toFixed(1)}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  {reviewStats?.mostReviewedProducts?.find(
                    (p) => p?._id === product?._id
                  )?.reviewCount || 0}{' '}
                  reviews
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
