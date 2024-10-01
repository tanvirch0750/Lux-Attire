import { createOrderAction } from '@/app/actions/order/order';
import { Button } from '@/components/ui/button';
import { IOrder } from '@/db/models/order-model';
import { stripe } from '@/lib/stripe';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';

interface SearchParams {
  session_id?: string;
}

export default async function OrderConfirmation({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const checkoutSession = await stripe.checkout.sessions.retrieve(
    searchParams.session_id!,
    {
      expand: ['line_items', 'payment_intent'],
    }
  );

  const paymentIntent = checkoutSession?.payment_intent;
  // @ts-ignore
  const paymentStatus = paymentIntent?.status;

  const products = checkoutSession?.line_items;
  const metaData = checkoutSession?.metadata;

  console.log('line items', products);

  // Convert products to orderItems array
  const orderItems = products?.data
    .slice(0, -1) // Remove the last item from the array
    .map((item) => {
      // Destructure the item properties needed for the orderItems
      const { description, price } = item;

      console.log('price', price);

      // Split the description to extract necessary fields
      const [
        itemName,
        itemSize,
        itemColor,
        itemImage,
        itemPrice,
        itemProductId,
        itemQuantity,
        itemTotalPrice,
      ] = description?.split('---') as string[];

      return {
        productId: itemProductId,
        name: itemName,
        image: itemImage,
        size: itemSize,
        color: itemColor,
        quantity: Number(itemQuantity),
        price: Number(itemPrice),
        totalPrice: Number(itemTotalPrice),
      };
    });
  const { user, ...othersOrderData } = JSON.parse(metaData?.order as string);

  const orderData: IOrder = {
    orderItems: orderItems,
    ...othersOrderData,
    orderStatus: 'confirmed',
    session_id: searchParams?.session_id,
    isPaid: true,
  };

  if (paymentStatus === 'succeeded') {
    // send  email  to the  user
    // update order db
    await createOrderAction(orderData, user);
  } else {
    toast.error('Payment Failed, please try again', {
      position: 'top-center',
    });
    redirect('/checkout');
  }

  if (!searchParams?.session_id) {
    throw new Error('Please Provide a valid session id');
  }

  return (
    <section className=" border-t pt-8 pb-20">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {paymentStatus === 'succeeded' ? (
          <>
            <div className="text-center mb-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Congratulations! Your payment is successful.
              </h1>
              <p className="text-gray-600 text-base">
                We received your order. Your order is
                <span className=" text-green-500"> confirmed</span> and ready to
                ship.
              </p>
            </div>

            <div className="border-t border-gray-200 py-6">
              <div className="flex flex-col gap-2 md:flex-row md:justify-between items-center">
                <div>
                  <h2 className="text-sm font-medium text-primary mb-2">
                    SHIPPING ADDRESS
                  </h2>
                  <p className="text-sm text-gray-600">
                    {othersOrderData?.shippingAddress}
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone: {othersOrderData?.phone}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-medium text-primary mb-2">
                    PAYMENT Method
                  </h2>
                  <p className="text-sm text-gray-600">Stripe</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6">
              <h2 className="text-sm font-medium text-primary mb-4">
                ORDER ITEMS
              </h2>
              <ul className="divide-y divide-gray-200">
                {orderItems?.map((item) => (
                  <li
                    key={item?.productId as string}
                    className="py-4 flex items-center"
                  >
                    <Image
                      src={item?.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-20 h-20 object-cover mr-4"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item?.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Color: {item?.color}
                      </p>
                      <p className="text-sm text-gray-600">
                        Size: {item?.size}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item?.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 flex flex-col gap-2">
                      <span>Product Price: ${item?.price.toFixed(2)}</span>
                      <span>Total Price: ${item?.price * item?.quantity}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 py-6">
              <div className="flex justify-between  mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium text-gray-900">
                  ${othersOrderData?.itemsPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between  mb-2">
                <p className="text-gray-600">Shipping Price</p>
                <p className="font-medium text-gray-900">
                  ${othersOrderData?.shippingPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between  font-medium">
                <p className="text-gray-900">Total</p>
                <p className="text-brand">
                  ${othersOrderData?.totalPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col space-y-4">
              <Button
                asChild
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Link href={`/my-orders`}>Your Orders</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-2 bg-brand border-brand text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 hover:bg-brand/90 hover:text-white"
              >
                <Link href="/products">
                  <ShoppingBag className="mr-2 h-5 w-5" /> Continue Shopping
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Sorry! Your payment is Unsuccessful.
              </h1>
              <Button
                asChild
                className=" bg-red-500 hover:bg-red-600 text-white"
              >
                <Link href={`/checkout`}>Try Again</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
