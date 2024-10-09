import {
  ICartItem,
  removeItem,
  updateQuantity,
} from '@/lib/features/cartSlice';
import { PlusIcon, MinusIcon, Tag, Truck } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { Badge } from '@/components/ui/badge';

const CartItem = ({ item }: { item: ICartItem }) => {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    dispatch(
      updateQuantity({ productId: item.productId, quantity: item.quantity + 1 })
    );
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          productId: item.productId,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  const handleRemove = () => {
    dispatch(removeItem(item.productId));
  };

  const currentDate = new Date();
  const activeOffers =
    item.offers?.filter(
      (offer) => offer.isActive && new Date(offer.validUntil) > currentDate
    ) || [];

  const discountOffer = activeOffers.find(
    (offer) => offer.offerType === 'discount'
  );
  const shippingOffer = activeOffers.find(
    (offer) => offer.offerType === 'freeShipping'
  );

  const totalPrice = item?.price * item.quantity;

  return (
    <li className="flex py-4 border-b last:border-b-0">
      <div className="flex-shrink-0 mr-4">
        <Image
          width={80}
          height={80}
          className="object-cover rounded"
          src={item?.image?.imageSrc}
          alt={item?.image?.imageAlt}
        />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{item?.name}</h3>
          <p className="text-lg font-semibold text-gray-800">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-2 text-sm text-gray-600">
          <span>Color: {item?.color?.name}</span>
          <span>|</span>
          <span>Size: {item?.size?.name}</span>
          <span>|</span>
          <span className="flex items-center mb-2">
            <span className="text-sm text-gray-600 mr-2">Price:</span>
            {discountOffer ? (
              <>
                <span className="line-through text-sm text-gray-400 mr-1">
                  {item?.oldPrice}€
                </span>
                <span className="text-sm font-semibold text-brand">
                  {item?.price?.toFixed(2)}€
                </span>
              </>
            ) : (
              <span className="text-sm text-gray-800">{item?.price}€</span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrease}
              className="w-6 h-6 flex items-center justify-center text-brand bg-orange-100 rounded-full hover:bg-gray-300"
            >
              <MinusIcon size={16} />
            </button>
            <p className="text-gray-800">{item?.quantity}</p>
            <button
              onClick={handleIncrease}
              className="w-6 h-6 flex items-center justify-center text-brand bg-orange-100 rounded-full hover:bg-gray-300"
            >
              <PlusIcon size={16} />
            </button>
          </div>
          {activeOffers.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {discountOffer && (
                <Badge variant="destructive" className="text-xs">
                  <Tag className="mr-1 h-3 w-3" />
                  {discountOffer.value}% OFF
                </Badge>
              )}
            </div>
          )}
          <button
            onClick={handleRemove}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
