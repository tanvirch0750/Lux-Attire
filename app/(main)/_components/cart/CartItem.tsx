import {
  ICartItem,
  removeItem,
  updateQuantity,
} from '@/lib/features/cartSlice';

import { PlusIcon, MinusIcon } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

const CartItem = ({ item }: { item: ICartItem }) => {
  const dispatch = useDispatch();

  console.log('cart item', item);

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

  return (
    <li className="flex flex-col py-4 sm:flex-row sm:justify-between">
      <div className="flex w-full space-x-2 sm:space-x-4">
        <Image
          width={100}
          height={100}
          className="flex-shrink-0 object-cover w-20 h-20 rounded sm:w-[80px] sm:h-[80px]"
          src={item?.image?.imageSrc}
          alt={item?.image?.imageAlt}
        />
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between w-full pb-2">
            <div>
              <h3 className="text-lg font-semibold">{item?.name}</h3>
              <div className=" flex gap-2 items-center">
                <p className="text-sm text-gray-600">Price: {item?.price}€</p>
                <span className="text-sm text-gray-600">|</span>
                <p className="text-sm text-gray-600">
                  Color: {item?.color?.name}
                </p>
                <span className="text-sm text-gray-600">|</span>
                <p className="text-sm text-gray-600">
                  size: {item?.size?.name}
                </p>
              </div>
            </div>
            <p className="text-lg font-semibold">
              ${(item?.price * item?.quantity).toFixed(2)}
            </p>
          </div>
          <div className="flex items-center justify-between text-sm divide-x">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleDecrease}
                className="w-6 h-6 flex items-center justify-center text-brand bg-orange-100 rounded-full hover:bg-gray-300"
              >
                <MinusIcon size={16} />
              </button>
              <p>{item?.quantity}</p>
              <button
                onClick={handleIncrease}
                className="w-6 h-6 flex items-center justify-center text-brand bg-orange-100 rounded-full hover:bg-gray-300"
              >
                <PlusIcon size={16} />
              </button>
            </div>
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 pl-2"
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
