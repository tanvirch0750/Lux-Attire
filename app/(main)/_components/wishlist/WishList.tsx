import { HeartIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import EmptyWishlistImg from '@/assests/wishlist.png';
import Image from 'next/image';
import Link from 'next/link';
import { WishlistItems } from './WishListItems';
import ClearWishlist from './ResetWishlist';

export default function Wishlist() {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative inline-block pl-5">
          <HeartIcon className="h-8 w-8 text-primary" strokeWidth="1" />
          {wishlistItems?.length > 0 && (
            <span className="absolute top-[-5px] right-[-14px] h-6 w-6 flex items-center justify-center rounded-full bg-brand text-white text-xs font-bold leading-tight text-center">
              {wishlistItems?.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="bg-white flex flex-col justify-between">
        {wishlistItems?.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold">Your Wishlist</h2>
            <ScrollArea className="flex-1 w-full rounded-md border mt-3">
              <WishlistItems wishlistItems={wishlistItems} />
            </ScrollArea>
            <ClearWishlist />
          </>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="text-center flex flex-col justify-center items-center">
                <Image
                  src={EmptyWishlistImg}
                  alt="empty wishlist img"
                  width={100}
                  className="text-center"
                />
                <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-4">
                  Your wishlist is empty
                </h2>
                <p className="text-gray-600 mb-8">
                  Looks like you haven&apos;t added anything to your wishlist
                  yet.
                </p>
                <SheetClose asChild>
                  <Link
                    href="/products"
                    className="px-6 py-3 bg-brand text-white font-semibold rounded-md shadow hover:bg-brand/90 transition duration-300"
                  >
                    Start Shopping
                  </Link>
                </SheetClose>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
