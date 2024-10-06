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
import { Package, DollarSign, ShoppingCart, Star } from 'lucide-react';

// Define the type for our product data
type ProductData = {
  totalProducts: number;
  availableProducts: number;
  soldProducts: Array<{ _id: string; totalSold: number; name: string }>;
  averageRating: Array<{ avgRating: number; productId: string; name: string }>;
  mostPopularProducts: Array<{ _id: string; totalSold: number; name: string }>;
  totalReviews: Array<{ reviewCount: number; productId: string; name: string }>;
  revenuePerProduct: Array<{ _id: string; totalRevenue: number; name: string }>;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const BarGraph = ({
  data,
}: {
  data: Array<{ name: string; totalSold: number }>;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Most Popular Products</CardTitle>
      <CardDescription>Top products by units sold</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSold" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

const PieGraph = ({
  data,
}: {
  data: Array<{ name: string; totalRevenue: number }>;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>Sales Distribution</CardTitle>
      <CardDescription>Sales per product</CardDescription>
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
            dataKey="totalRevenue"
          >
            {data.map((entry, index) => (
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

const RecentSales = ({
  data,
  revenueData,
}: {
  data: Array<{ name: string; totalSold: number }>;
  revenueData: Array<{ name: string; totalRevenue: number }>;
}) => (
  <div>
    {data.map((item, index) => (
      <div key={index} className="flex items-center mb-3">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{item?.name}</p>
          <p className="text-sm text-muted-foreground">
            {item?.totalSold} units sold
          </p>
        </div>
        <div className="ml-auto font-medium">
          ${revenueData?.find((p) => p.name === item.name)?.totalRevenue || 0}
        </div>
      </div>
    ))}
  </div>
);

interface ProductDashboardProps {
  productData: ProductData;
}

export default function ProductDashboard({
  productData,
}: ProductDashboardProps) {
  const totalRevenue = productData.revenuePerProduct?.reduce(
    (sum, item) => sum + item.totalRevenue,
    0
  );
  const totalSold = productData.soldProducts?.reduce(
    (sum, item) => sum + item.totalSold,
    0
  );
  const averageOrderValue = totalRevenue / totalSold;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Product Sales (Paid & Unpaid)
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{productData?.totalProducts}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Order Value
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${averageOrderValue?.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Top Rated Product
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-md font-bold">
              {productData?.averageRating[0].name}
            </div>
            <div className="text-sm text-muted-foreground">
              Rating: {productData?.averageRating[0].avgRating.toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <PieGraph data={productData?.revenuePerProduct} />
        </div>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made {totalSold} sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales
              data={productData?.soldProducts}
              revenueData={productData?.revenuePerProduct}
            />
          </CardContent>
        </Card>
        <div className="col-span-4">
          <BarGraph data={productData?.mostPopularProducts} />
        </div>
      </div>
    </div>
  );
}
