import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductImage } from './types';

interface ProductImagesProps {
  images: ProductImage[];
}

export default function ProductImages({ images }: ProductImagesProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Click on an image to view it in full size
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative aspect-square">
              <Image
                src={image.imageSrc}
                alt={image.imageAlt}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              {image.primary && (
                <Badge className="absolute top-2 right-2">Primary</Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
