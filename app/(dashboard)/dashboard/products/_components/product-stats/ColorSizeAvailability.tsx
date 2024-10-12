import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Color } from './types';

interface ColorSizeAvailabilityProps {
  colors: Color[];
}

export default function ColorSizeAvailability({
  colors,
}: ColorSizeAvailabilityProps) {
  console.log('color and sizes', colors);
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Color & Size Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {colors.map((color) => (
            <div key={color.name} className="space-y-2">
              <div className="flex items-center space-x-2">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: color.bgColor }}
                />
                <span className="text-sm font-medium">{color.name}</span>
              </div>
              <div className="flex space-x-2">
                {color.sizeStocks.map((sizeStock) => (
                  <Badge
                    key={sizeStock.size}
                    className={`${
                      sizeStock.isAvailable
                        ? 'hover:bg-green-200 hover:text-green-800 bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800'
                    }`}
                  >
                    {sizeStock.size} ({sizeStock.stock})
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
