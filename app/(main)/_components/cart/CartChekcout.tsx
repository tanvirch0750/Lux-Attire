// import { useAppSelector } from '@/lib/hooks';

import { SheetClose } from '@/components/ui/sheet';
import { RootState } from '@/lib/store';
import Link from 'next/link';
import { useSelector } from 'react-redux';

export default function CartChekcout() {
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  return (
    <div className="mt-auto">
      <div className="text-right">
        <p className="text-xl">
          Total amount:{' '}
          <span className="font-semibold">{totalPrice.toFixed(2)}€</span>
        </p>
        <p className="text-sm">Not including taxes and shipping costs</p>
      </div>
      <div className="flex justify-end space-x-4 mt-4">
        <SheetClose asChild>
          <Link
            href="/products"
            className="px-6 py-2 bg-primary text-white rounded-md"
          >
            Back to shop
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href="/checkout"
            className="px-6 py-2 bg-brand text-white rounded-md"
          >
            Continue to Checkout
          </Link>
        </SheetClose>
      </div>
    </div>
  );
}
