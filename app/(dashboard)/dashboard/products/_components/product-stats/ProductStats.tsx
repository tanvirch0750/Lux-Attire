'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

import InventoryTab from './InventoryTab';
import { Product } from './types';
import OverviewTab from './OverviewTab';
import AnalyticsTab from './AnalyticsTab';
import Link from 'next/link';

interface ProductStatsProps {
  product: Product;
}

export default function ProductStats({ product }: ProductStatsProps) {
  console.log('product stats', product);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{product.name}</h2>
        <div className="flex items-center space-x-2">
          {/* <Link href={`/dashboard/products/edit/${product?._id}`}>
            <Button className=" bg-brand hover:bg-brand/500">Edit</Button>
          </Link> */}
          <Link href={`/products`}>
            <Button variant="outline">View on Store</Button>
          </Link>
        </div>
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
