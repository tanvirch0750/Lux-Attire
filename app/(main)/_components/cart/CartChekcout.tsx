// import { useAppSelector } from '@/lib/hooks';

import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { resetCart } from '@/lib/features/cartSlice';
import { RootState } from '@/lib/store';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';

export default function CartChekcout() {
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const dispatch = useDispatch();

  return (
    <div className="mt-auto">
      <div className="text-right">
        <p className="text-xl">
          Total amount:{' '}
          <span className="font-semibold">{totalPrice.toFixed(2)}€</span>
        </p>
        <p className="text-sm">Not including taxes and shipping costs</p>
      </div>
      <div className="flex justify-end space-x-4 mt-4 items-center">
        <Button variant="destructive" onClick={() => dispatch(resetCart())}>
          Clear Cart
        </Button>
        <SheetClose asChild>
          <Link href="/products">
            <Button>Back to shop</Button>
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link href="/checkout" className="">
            <Button className="px-6 py-2 bg-brand hover:bg-brand/90">
              Continue to Checkout
            </Button>
          </Link>
        </SheetClose>
      </div>
    </div>
  );
}
