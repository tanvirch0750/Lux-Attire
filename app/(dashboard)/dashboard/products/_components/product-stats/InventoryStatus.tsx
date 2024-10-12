import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { Color } from './types';

interface InventoryStatusProps {
  colors: Color[];
}

export default function InventoryStatus({ colors }: InventoryStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {colors.map((color) => (
            <div key={color.name}>
              <h4 className="text-sm font-medium mb-4 flex items-center">
                <div
                  className="h-4 w-4 rounded-full mr-2"
                  style={{ backgroundColor: color.bgColor }}
                />
                {color.name}
              </h4>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {color.sizeStocks.map((sizeStock) => (
                  <Card key={`${color.name}-${sizeStock.size}`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {sizeStock.size}
                      </CardTitle>
                      {sizeStock.isAvailable ? (
                        <CheckCircledIcon className="h-4 w-4 text-green-500" />
                      ) : (
                        <CrossCircledIcon className="h-4 w-4 text-red-500" />
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {sizeStock.stock}
                      </div>
                      <div>
                        <p className="text-xs text-brand">
                          {sizeStock.stock === 0
                            ? 'Out of Stock'
                            : sizeStock.stock < 10
                            ? 'Low Stock'
                            : 'In Stock'}
                        </p>

                        {!sizeStock?.isAvailable && sizeStock?.stock > 0 && (
                          <p className="text-xs text-brand">
                            In Stock but on hold
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
