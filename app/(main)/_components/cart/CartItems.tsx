import { ICartItem } from '@/lib/features/cartSlice';
import CartItem from './CartItem';

export const CartItems = ({ cartItems }: { cartItems: ICartItem[] }) => {
  console.log(cartItems);
  return (
    <div className="flex flex-col p-3  ">
      <ul className="flex flex-col divide-y ">
        {cartItems?.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};
