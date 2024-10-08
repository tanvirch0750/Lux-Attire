import { IWishlistItem } from '@/lib/features/wishListSlice';
import WishlistItem from './WishListItem';

export const WishlistItems = ({
  wishlistItems,
}: {
  wishlistItems: IWishlistItem[];
}) => {
  return (
    <div className="flex flex-col p-3">
      <ul className="flex flex-col divide-y">
        {wishlistItems?.map((item, index) => (
          <WishlistItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};
