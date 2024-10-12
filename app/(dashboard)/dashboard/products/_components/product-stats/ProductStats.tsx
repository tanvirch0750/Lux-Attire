'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import InventoryTab from './InventoryTab';
import { Product } from './types';
import OverviewTab from './OverviewTab';
import AnalyticsTab from './AnalyticsTab';

import NaviagtionLinks from './NaviagtionLinks';

interface ProductStatsProps {
  product: Product;
}

export default function ProductStats({ product }: ProductStatsProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{product.name}</h2>
        <NaviagtionLinks
          productId={product?._id as string}
          category={product?.categoryDetails?.value}
        />
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <OverviewTab product={product} />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsTab product={product} />
        </TabsContent>
        <TabsContent value="inventory">
          <InventoryTab product={product} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
