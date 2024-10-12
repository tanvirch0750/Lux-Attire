import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NaviagtionLinks({
  productId,
  category,
}: {
  productId: string;
  category: string;
}) {
  return (
    <div className="flex items-center space-x-2">
      <Link href={`/dashboard/products/edit/${productId}`}>
        <Button className=" bg-brand hover:bg-brand/500">Edit</Button>
      </Link>
      <Link href={`/products/${category}/${productId}`}>
        <Button variant="outline">View on Store</Button>
      </Link>
    </div>
  );
}
