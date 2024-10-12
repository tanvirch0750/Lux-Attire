import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { auth } from '@/auth';
import { getUserByEmail } from '@/db/actions-and-queries/user/user-query';
import { getOrderById } from '@/db/actions-and-queries/orders/orders-queries';
import { IOrder } from '@/db/models/order-model';
import Image from 'next/image';
import { formatDateAndTime } from '@/lib/utils';
import WhatsAppButton from '@/components/WhatsappButton';
import GiveReview from '../../_components/my-orders/GiveReview';
import { redirect } from 'next/navigation';

const OrderSummaryPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);

  if (user?.role !== 'user') {
    redirect('/unauthorized');
  }

  const order: IOrder = await getOrderById(params?.id, user?._id);

  const createdAtString =
    order?.createdAt instanceof Date
      ? order.createdAt.toISOString()
      : order?.createdAt || '';
  const { date, time } = formatDateAndTime(createdAtString);

  const { date: deliveredDate, time: deliveredTime } = formatDateAndTime(
    order?.deliveredAt as string
  );

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-brand';
      case 'delivered':
        return 'text-green-600';
      case 'cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className=" border-t mb-24">
      <MaxWidthWrapper className="pt-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center gap-2">
            <h1 className="text-base text-brand ">Thank You!</h1>
            <Link href="/my-orders">
              <Button
                className=" border-brand hover:bg-orange-100 hover:border-brand hover:text-brand text-brand"
                size="sm"
                variant="outline"
              >
                My Orders
              </Button>
            </Link>
          </div>
          <h2 className="text-3xl font-bold ">
            {order?.orderStatus === 'delivered' ? (
              <span className="text-green-600">Delivered to you!</span>
            ) : (
              <span className="text-primary">It’s on the way!</span>
            )}
          </h2>
          <div className=" flex items-center flex-col md:flex-row justify-between">
            {order?.orderStatus === 'delivered' ? (
              <>
                <p className="mt-2">
                  Your order with order Id{' '}
                  <span className="font-bold text-brand">
                    #{order?.orderId}
                  </span>{' '}
                  has been delireved. Please leave a{' '}
                  <span className="font-bold text-brand">review</span> for the
                  product.
                </p>
              </>
            ) : (
              <>
                <p className="mt-2">
                  Your order with order Id{' '}
                  <span className="font-bold text-brand">
                    #{order?.orderId}
                  </span>{' '}
                  has shipped and will be with you soon.
                </p>
              </>
            )}

            <p className=" flex items-center gap-3">
              <span>
                Order Status:{' '}
                <span
                  className={`font-semibold capitalize ${getOrderStatusColor(
                    order?.orderStatus as string
                  )}`}
                >
                  {order?.orderStatus}
                </span>
              </span>{' '}
              <span>|</span>
              <span>
                Payment Status:{' '}
                <span className="  font-semibold">
                  {order?.isPaid ? (
                    <span className="text-green-500">Paid</span>
                  ) : (
                    <span className="text-red-500">Not Paid</span>
                  )}
                </span>
              </span>
            </p>
          </div>
        </div>

        {/* Order Items Section */}
        <div className="space-y-6 mt-12">
          {/* Single Order Item */}
          {order?.orderItems.map((item, index) => (
            <div key={index} className="border  rounded-md">
              <div className=" grid grid-cols-12 gap-6 p-4">
                {/* Product Info */}
                <div className="flex space-x-4 col-span-6">
                  <Image
                    src={item?.image}
                    alt="Product"
                    width={300}
                    height={300}
                    className="w-24 h-[105px] object-cover rounded-md"
                  />
                  <div>
                    <div className=" fle flex-col items-center">
                      <h3 className="text-lg ">{item?.name}</h3>
                      <p className="text-gray-600">
                        Color:{' '}
                        <span className="font-semibold">{item?.color}</span> |
                        Size:{' '}
                        <span className="font-semibold">{item?.size}</span>
                      </p>
                    </div>
                    <p className="mt-6 text-gray-600">
                      Quantity:{' '}
                      <span className="font-semibold">{item?.quantity}</span> |
                      Price:{' '}
                      <span className=" font-semibold">${item?.price}</span> |
                      Total Price:{' '}
                      <span className=" font-semibold">
                        ${item?.totalPrice}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Shipping & Billing Address */}
                <div className="text-right col-span-3">
                  <p className="text-lg mb-4">Shipping Address</p>
                  <div className="text-gray-600">
                    <p>{order?.shippingAddress}</p>
                  </div>
                </div>

                <div className="text-right col-span-3">
                  <p className="text-lg mb-4">Others</p>
                  <div className="text-gray-600">
                    <p>{order?.email}</p>
                    <p>Phone: {order?.phone}</p>
                  </div>
                </div>
              </div>

              {order?.orderStatus !== 'cancelled' && (
                <GiveReview
                  product={item}
                  user={user._id}
                  order={order?._id as string}
                />
              )}
            </div>
          ))}
        </div>

        {/* Shipping and Payment Method */}
        <div className="bg-gray-100 p-8 rounded-lg mt-12">
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div>
              <h4 className="font-bold">Shipping Method</h4>
              <p className=" mt-2 text-gray-600">
                TCS Courier – Takes up to 3 working days
              </p>
            </div>
            <div>
              <h4 className="font-bold">Payment Method</h4>
              <p className=" mt-2 text-gray-600">
                {order?.paymentMethod === 'stripe'
                  ? 'Stripe'
                  : 'Cash On Delivery'}
              </p>
            </div>
            <div>
              <h4 className="font-bold">Order Date</h4>
              <p className=" mt-2 text-gray-600 flex flex-col gap-1">
                <span>{date}</span>
                <span>{time}</span>
              </p>
            </div>

            {order?.deliveredAt && (
              <div>
                <h4 className="font-bold">Delivered Date</h4>
                <p className=" mt-2 text-gray-600 flex flex-col gap-1">
                  <span>{deliveredDate}</span>
                  <span>{deliveredTime}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 mt-6 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${order?.itemsPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>${order?.shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl mt-4">
            <span>Total</span>
            <span className=" text-brand">
              ${order?.totalPrice?.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="text-center mt-6 flex justify-end">
          <WhatsAppButton />
          <Link href="/products" className=" py-2">
            <Button className="bg-brand  hover:bg-brand/90">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default OrderSummaryPage;
