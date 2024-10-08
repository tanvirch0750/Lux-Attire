import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { resetWishlist } from '@/lib/features/wishListSlice';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

export default function ClearWishlist() {
  const dispatch = useDispatch();

  return (
    <div className="mt-auto">
      <div className="flex justify-end space-x-4 mt-4 items-center">
        <Button variant="destructive" onClick={() => dispatch(resetWishlist())}>
          Clear Cart
        </Button>
        <SheetClose asChild>
          <Link href="/products">
            <Button>Back to shop</Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Button className="px-6 py-2 bg-brand hover:bg-brand/90">
            Close
          </Button>
        </SheetClose>
      </div>
    </div>
  );
}
