import {
  IWishlistItem,
  removeItemFromWishlist,
} from '@/lib/features/wishListSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

const WishlistItem = ({ item }: { item: IWishlistItem }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeItemFromWishlist(item.productId));
  };

  return (
    <li className="flex flex-col py-4 sm:flex-row sm:justify-between">
      <div className="flex w-full space-x-2 sm:space-x-4">
        <Image
          width={100}
          height={100}
          className="flex-shrink-0 object-cover w-20 h-20 rounded sm:w-[80px] sm:h-[80px]"
          src={item?.image}
          alt={item?.image}
        />
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between w-full pb-2">
            <div>
              <h3 className="text-lg font-semibold">{item?.name}</h3>
              <div className=" flex gap-2 items-center">
                <p className="text-sm text-gray-600">Price: {item?.price}€</p>
                <span className="text-sm text-gray-600">|</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700"
            >
              <span>Remove</span>
            </button>
            <Link
              href={`/products/${item?.category}/${item?.productId}`}
              className="text-brand hover:text-brand/90"
            >
              <span>Buy Now</span>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default WishlistItem;
