import PageContainer from '../_components/layout/PageContainer';
import ProductStats from '../_components/product-stats/ProductStats';
import SalesStats from '../_components/sales-stats/SalesStats';
import OrderAndReviewStats from '../_components/order-review-stats/OrderAndReviewStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UsersAndCategoryStats from '../_components/category-users-stats/CategoryAndUserStats';
import { BarChart, LayoutDashboard, ShoppingCart, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function DashboardHomePage() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2 pb-12">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight  mb-4">
            Hi, Welcome back 👋
          </h2>
        </div>

        <Tabs defaultValue="sales" className="w-full" orientation="vertical">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-1 bg-muted rounded-lg mb-6">
            <TabsTrigger
              value="sales"
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow"
            >
              <BarChart className="w-4 h-4" />
              <span className="hidden sm:inline">Sales Stats</span>
            </TabsTrigger>
            <TabsTrigger
              value="product"
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Product Stats</span>
            </TabsTrigger>
            <TabsTrigger
              value="order"
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Order & Review</span>
            </TabsTrigger>
            <TabsTrigger
              value="user"
              className="flex items-center gap-2 px-4 py-2 rounded-md transition-all data-[state=active]:bg-white data-[state=active]:text-brand data-[state=active]:shadow"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Users & Category</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sales">
            <SalesStats />
          </TabsContent>
          <TabsContent value="product">
            <ProductStats />
          </TabsContent>
          <TabsContent value="order">
            <OrderAndReviewStats />
          </TabsContent>
          <TabsContent value="user">
            <UsersAndCategoryStats />
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
