'use client';

import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import {
  addItemToWishlist,
  IWishlistItem,
  removeItemFromWishlist,
} from '@/lib/features/wishListSlice';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import { TProduct } from '@/db/models/product-model';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function AddToWishListButton({
  product,
  isHidden = true,
}: {
  product: IWishlistItem;
  isHidden?: boolean;
}) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  // Check if the product is already in the wishlist
  const isInWishlist = wishlistItems.some(
    (item) => item.productId === product.productId
  );

  // Handle wishlist toggle
  const handleWishlistToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInWishlist) {
      dispatch(removeItemFromWishlist(product.productId as string));
    } else {
      dispatch(
        addItemToWishlist({
          productId: product?.productId as string,
          name: product?.name,
          price: product?.price,
          image: product?.image,
          category: product?.category,
        })
      );
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={10}>
        <TooltipTrigger asChild>
          <button
            onClick={handleWishlistToggle}
            className={`text-brand transition hover:text-brand/90 ${
              isHidden ? 'hidden group-hover:block' : ''
            }`}
            aria-label="Add to wishlist"
          >
            {isInWishlist ? (
              <HeartFilledIcon className="w-6 h-6 text-brand" />
            ) : (
              <Heart className="w-6 h-6" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {isInWishlist ? <p>Remove from wishlist</p> : <p>Add to wishlist</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
