import { ICartItem } from '@/lib/features/cartSlice';
import CartItem from './CartItem';
import { Badge } from '@/components/ui/badge';
import { Truck, AlertCircle } from 'lucide-react';
import { isOfferDateValidUntil } from '@/lib/utils';

export const CartItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  const allItemsHaveFreeShipping = cartItems.every((item) => {
    const activeOffers =
      item.offers?.filter(
        (offer) => offer.isActive && isOfferDateValidUntil(offer.validUntil)
      ) || [];
    return activeOffers.some((offer) => offer.offerType === 'freeShipping');
  });

  const someItemsHaveFreeShipping = cartItems.some((item) => {
    const activeOffers =
      item.offers?.filter(
        (offer) => offer.isActive && isOfferDateValidUntil(offer.validUntil)
      ) || [];
    return activeOffers.some((offer) => offer.offerType === 'freeShipping');
  });

  return (
    <div className="flex flex-col p-3">
      {allItemsHaveFreeShipping && (
        <div className="mb-4 p-2 bg-gray-100 rounded-md flex items-center justify-center">
          <Badge variant="secondary" className="text-base">
            <Truck className="mr-2 h-4 w-4" />
            Free Shipping on All Items
          </Badge>
        </div>
      )}
      {someItemsHaveFreeShipping && !allItemsHaveFreeShipping && (
        <div className="mb-4 p-2 bg-yellow-100 rounded-md flex items-center">
          <AlertCircle className="mr-2 h-4 w-4 text-yellow-600" />
          <p className="text-sm text-yellow-700">
            Free shipping is only applied when all items in the cart are
            eligible. Some items in your cart do not qualify for free shipping.
          </p>
        </div>
      )}
      <ul className="flex flex-col divide-y">
        {cartItems?.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};
