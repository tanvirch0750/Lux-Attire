import PageContainer from '../_components/layout/PageContainer';
import SalesStats from '../_components/sales-stats/SalesStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
          <TabsList className="grid w-full gap-2 grid-cols-2">
            <TabsTrigger value="sales">Sales Stats</TabsTrigger>
            <TabsTrigger value="product">Product Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="sales">
            <SalesStats />
          </TabsContent>
          <TabsContent value="product">product</TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
