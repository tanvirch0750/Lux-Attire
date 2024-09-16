import CartItem from './CartItem';

export const CartItems = ({ cartItems }: any) => {
  console.log(cartItems);
  return (
    <div className="flex flex-col p-3  ">
      <ul className="flex flex-col divide-y ">
        {cartItems?.map((item: any, index: any) => (
          <CartItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};
