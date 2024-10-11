import { ICartItem } from '@/lib/features/cartSlice';
import Image from 'next/image';
import { Tag, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CartDetails({ cartItems }: { cartItems: ICartItem[] }) {
  const calculateDiscountedPrice = (
    price: number,
    discountPercentage: number
  ) => {
    return price - (price * discountPercentage) / 100;
  };

  const allItemsHaveFreeShipping = cartItems.every((item) => {
    const currentDate = new Date();
    const activeOffers =
      item.offers?.filter(
        (offer) => offer.isActive && new Date(offer.validUntil) > currentDate
      ) || [];
    return activeOffers.some((offer) => offer.offerType === 'freeShipping');
  });

  return (
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-2 sm:px-2">
      {allItemsHaveFreeShipping && (
        <div className="mb-4 p-2 bg-gray-100 rounded-md flex items-center justify-center">
          <Badge variant="secondary" className="text-base">
            <Truck className="mr-2 h-4 w-4" />
            Free Shipping on All Items
          </Badge>
        </div>
      )}
      {cartItems?.map((item) => {
        const currentDate = new Date();
        const activeOffers =
          item.offers?.filter(
            (offer) =>
              offer.isActive && new Date(offer.validUntil) > currentDate
          ) || [];

        const discountOffer = activeOffers.find(
          (offer) => offer.offerType === 'discount'
        );

        const totalPrice = item.price * item.quantity;

        return (
          <div
            key={item?.name}
            className="flex flex-col rounded-lg bg-white sm:flex-row"
          >
            <Image
              width={500}
              height={500}
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src={item?.image?.imageSrc}
              alt={item?.image?.imageAlt}
            />
            <div className="flex w-full flex-col px-4 py-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{item?.name}</span>
                <span className="font-semibold text-gray-600">
                  Quantity: {item?.quantity}
                </span>
              </div>
              <div className="py-1 flex items-center gap-2">
                <span className="float-right text-gray-600 flex items-center gap-2">
                  <span className="font-bold">Color:</span>
                  <span
                    className={`inline-block w-4 h-4 rounded-full`}
                    style={{ backgroundColor: `${item?.color?.bgColor}` }}
                  ></span>
                </span>
                <span className="text-gray-600">|</span>
                <span className="float-right text-gray-600">
                  <span className="font-bold">Size:</span> {item?.size}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 mt-2">
                <div className="flex flex-col">
                  {discountOffer && item?.oldPrice ? (
                    <div className=" flex items-center gap-2">
                      <span className="text-lg font-bold text-brand">
                        ${item?.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${item?.oldPrice.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold">
                      ${item?.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <span className="text-gray-600">
                  Total: ${totalPrice.toFixed(2)}
                </span>
              </div>
              {discountOffer && (
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="destructive">
                    <Tag className="mr-1 h-3 w-3" />
                    {discountOffer.value}% OFF
                  </Badge>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
