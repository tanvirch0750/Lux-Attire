import { Trash2Icon, TrashIcon, PlusIcon, MinusIcon } from 'lucide-react';
import React, { useState } from 'react';

const CartItem = ({ item }: any) => {
  // State to manage the quantity of the item
  const [quantity, setQuantity] = useState(1);

  // Function to handle increasing the quantity
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Function to handle decreasing the quantity, ensuring it doesn't go below 1
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <li className="flex flex-col py-4 sm:flex-row sm:justify-between">
      <div className="flex w-full space-x-2 sm:space-x-4">
        <img
          className="flex-shrink-0 object-cover w-20 h-20 rounded outline-none sm:w-[80px] sm:h-[80px]"
          src={item.image}
          alt={item.name}
        />
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between w-full pb-2 space-x-2">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold leading-snug sm:pr-8">
                {item.name}
              </h3>
              <p className="text-sm">Price: {item.price}€</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">
                {(item.price * quantity).toFixed(2)}€
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm divide-x">
            {/* Quantity Management Section */}
            <div className="flex items-center space-x-2">
              <button
                onClick={decreaseQuantity}
                className="flex items-center justify-center w-6 h-6 text-brand bg-orange-100 rounded-full hover:bg-gray-300"
              >
                <MinusIcon size={16} />
              </button>
              <p className="text-lg">{quantity}</p>
              <button
                onClick={increaseQuantity}
                className="flex items-center justify-center w-6 h-6 text-brand bg-orange-100 rounded-full hover:bg-gray-300"
              >
                <PlusIcon size={16} />
              </button>
            </div>
            {/* Remove Item Section */}
            <button
              type="button"
              className="flex items-center px-2 py-1 pl-0 space-x-1 text-red-500 hover:text-red-700"
            >
              <TrashIcon size={18} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
