import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SaleData } from './types';

interface TopSellingSizesProps {
  salesData: SaleData[];
}

export default function TopSellingSizes({ salesData }: TopSellingSizesProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top Selling Sizes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {salesData.map((sale) => (
            <div
              className="flex items-center"
              key={`${sale.color}-${sale.size}`}
            >
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {sale.color} - {sale.size}
                </p>
                <p className="text-sm text-muted-foreground">
                  {sale.totalQuantity} sold
                </p>
              </div>
              <div className="ml-auto font-medium">
                ${sale.totalRevenue.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
