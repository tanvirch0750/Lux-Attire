import { ICartItem } from '@/lib/features/cartSlice';
import Image from 'next/image';

export default function CartDetails({ cartItems }: { cartItems: ICartItem[] }) {
  return (
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-2 sm:px-2">
      {cartItems?.map((item) => (
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
            <div className=" flex items-center justify-between gap-2">
              <span className="font-semibold">{item?.name}</span>
              <span className="font-semibold text-gray-600">
                Quantity: {item?.quantity}
              </span>
            </div>
            <div className=" py-1 flex items-center gap-2">
              <span className="float-right text-gray-600 flex items-center gap-2">
                <span className=" font-bold">Color:</span>
                <span
                  className={`inline-block w-4 h-4 rounded-full`}
                  style={{ backgroundColor: `${item?.color?.bgColor}` }}
                ></span>
              </span>
              <span className=" text-gray-600">|</span>
              <span className="float-right text-gray-600">
                <span className="font-bold">Size:</span> {item?.size?.name}
              </span>
            </div>

            <p className="text-lg flex items-center justify-between gap-2">
              <span>${item?.price}</span>{' '}
              <span className=" text-gray-600">
                Total: ${item?.price * item.quantity}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
