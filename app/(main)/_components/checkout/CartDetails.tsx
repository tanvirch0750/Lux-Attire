import { ICartItem } from '@/lib/features/cartSlice';
import Image from 'next/image';
import { Tag, Truck, Minus, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '@/lib/features/cartSlice';
import { isOfferDateValidUntil } from '@/lib/utils';
import Link from 'next/link';

export default function CartDetails({ cartItems }: { cartItems: ICartItem[] }) {
  const dispatch = useDispatch();

  const allItemsHaveFreeShipping = cartItems.every((item) => {
    const activeOffers =
      item.offers?.filter((offer) => {
        return offer.isActive && isOfferDateValidUntil(offer.validUntil);
      }) || [];
    return activeOffers.some((offer) => offer.offerType === 'freeShipping');
  });

  const handleQuantityChange = (item: ICartItem, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(
        updateQuantity({
          productId: item.productId,
          color: item.color,
          size: item.size,
          quantity: newQuantity,
        })
      );
    }
  };

  const handleRemoveItem = (item: ICartItem) => {
    dispatch(
      removeItem({
        productId: item.productId,
        color: item.color,
        size: item.size,
      })
    );
  };

  return (
    <div className="mt-4 space-y-2 rounded-lg border bg-white px-2 py-2 sm:px-2">
      {allItemsHaveFreeShipping && (
        <div className="mb-2 p-1.5 bg-gray-100 rounded-md flex items-center justify-center">
          <Badge variant="secondary" className="text-sm">
            <Truck className="mr-1 h-3 w-3" />
            Free Shipping on All Items
          </Badge>
        </div>
      )}
      {cartItems?.map((item, index) => {
        // const currentDate = new Date();
        const activeOffers =
          item.offers?.filter(
            (offer) => offer.isActive && isOfferDateValidUntil(offer.validUntil)
          ) || [];

        const discountOffer = activeOffers.find(
          (offer) => offer.offerType === 'discount'
        );

        const totalPrice = item.price * item.quantity;

        return (
          <div
            key={index}
            className="flex items-start space-x-4 rounded-lg bg-white p-2 border-b last:border-b-0"
          >
            <Image
              width={300}
              height={300}
              className="h-20 w-20 rounded-md border object-cover object-center"
              src={item?.image?.imageSrc}
              alt={item?.image?.imageAlt}
            />
            <div className="flex flex-1 flex-col space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <Link href={`/products/${item?.category}/${item?.productId}`}>
                    <h3 className="font-semibold text-sm hover:text-brand">
                      {item?.name}
                    </h3>
                  </Link>

                  <div className="flex items-center text-xs text-gray-600 space-x-2 mt-1">
                    <span className="flex items-center">
                      Color:
                      <span
                        className="ml-1 inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: `${item?.color?.bgColor}` }}
                      ></span>
                    </span>
                    <span>|</span>
                    <span>Size: {item?.size}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() =>
                      handleQuantityChange(item, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="font-semibold text-sm w-6 text-center">
                    {item?.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() =>
                      handleQuantityChange(item, item.quantity + 1)
                    }
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-brand">
                    ${item?.price.toFixed(2)}
                  </span>
                  {discountOffer && item?.oldPrice && (
                    <span className="text-xs text-gray-500 line-through">
                      ${item?.oldPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-gray-600 text-xs">
                  Total: ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center space-x-2">
                  {discountOffer && (
                    <Badge variant="destructive" className="text-xs px-1 py-0">
                      <Tag className="mr-1 h-2 w-2" />
                      {discountOffer.value}% OFF
                    </Badge>
                  )}
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleRemoveItem(item)}
                  className="h-6 text-xs px-2 py-0"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
