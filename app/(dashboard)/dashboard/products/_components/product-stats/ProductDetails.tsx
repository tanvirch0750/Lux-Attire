import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Product } from './types';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium">Description</h4>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-medium">Details</h4>
            <ul className="list-disc pl-4 text-sm text-muted-foreground">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
