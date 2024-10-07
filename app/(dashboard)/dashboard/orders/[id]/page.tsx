import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { getAdminOrderById } from '@/db/actions-and-queries/orders/orders-queries';
import { IOrder } from '@/db/models/order-model';
import Image from 'next/image';
import { formatDateAndTime } from '@/lib/utils';
import PageContainer from '@/app/(dashboard)/_components/layout/PageContainer';

const OrderSummaryPage = async ({ params }: { params: { id: string } }) => {
  const order: IOrder = await getAdminOrderById(params?.id);

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
    <PageContainer>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center gap-2 mb-4">
          <p>
            Order Id:{' '}
            <span className=" text-brand font-semibold">#{order?.orderId}</span>
          </p>
          <Link href="/dashboard/orders">
            <Button
              className=" border-brand hover:bg-orange-100 hover:border-brand hover:text-brand text-brand"
              size="sm"
              variant="outline"
            >
              All Ordes
            </Button>
          </Link>
        </div>

        <div className=" flex items-center flex-col md:flex-row justify-between">
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
        {order?.orderItems.map((item) => (
          <div key={item?.productId as string} className="border  rounded-md">
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
                      Size: <span className="font-semibold">{item?.size}</span>
                    </p>
                  </div>
                  <p className="mt-6 text-gray-600">
                    Quantity:{' '}
                    <span className="font-semibold">{item?.quantity}</span> |
                    Price:{' '}
                    <span className=" font-semibold">${item?.price}</span> |
                    Total Price:{' '}
                    <span className=" font-semibold">${item?.totalPrice}</span>
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
      <div className="bg-gray-50 p-6 mt-6 rounded-lg mb-8">
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
          <span className=" text-brand">${order?.totalPrice?.toFixed(2)}</span>
        </div>
      </div>
    </PageContainer>
  );
};

export default OrderSummaryPage;
