import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { AddaReview } from '../../_components/my-orders/AddReview';

const OrderSummaryPage = () => {
  return (
    <div className=" border-t mb-24">
      <MaxWidthWrapper className="pt-12">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-base text-brand mb-2">Thank You!</h1>
          <h2 className="text-3xl font-bold text-gray-800">It’s on the way</h2>
          <div className=" flex items-center flex-col md:flex-row justify-between">
            <p className="mt-2">
              Your order with{' '}
              <span className="font-bold text-brand">Id #10234987</span> has
              shipped and will be with you soon.
            </p>
            <p className=" flex items-center gap-3">
              <span>
                Order Status:{' '}
                <span className="text-brand font-semibold">Pending</span>
              </span>{' '}
              <span>|</span>
              <span>
                Payment Status:{' '}
                <span className=" text-green-500 font-semibold">Confirmed</span>
              </span>
            </p>
          </div>
        </div>

        {/* Order Items Section */}
        <div className="space-y-6 mt-12">
          {/* Single Order Item */}
          {[1, 2].map((item) => (
            <div
              key={item}
              className=" grid grid-cols-12 gap-6 border p-8 rounded-md"
            >
              {/* Product Info */}
              <div className="flex space-x-4 col-span-6">
                <img
                  src="https://via.placeholder.com/100"
                  alt="Product"
                  className="w-24 h-[105px] object-cover rounded-md"
                />
                <div>
                  <div className=" fle flex-col items-center">
                    <h3 className="text-lg ">Sling Shot Bottle</h3>
                    <p className="text-gray-600">
                      Color: <span className="font-semibold">red</span> | Size:{' '}
                      <span className="font-semibold">XL</span>
                    </p>
                  </div>
                  <p className="mt-6 text-gray-600">
                    Quantity: <span className="font-semibold">01</span> | Price:{' '}
                    <span className=" font-semibold">$32.00</span>
                    <AddaReview />
                  </p>
                </div>
              </div>

              {/* Shipping & Billing Address */}
              <div className="text-right col-span-3">
                <p className="text-lg mb-4">Shipping Address</p>
                <div className="text-gray-600">
                  <p>180 North King Street</p>
                  <p>Northhampton MA 1060</p>
                </div>
              </div>

              <div className="text-right col-span-3">
                <p className="text-lg mb-4">Billing Address</p>
                <div className="text-gray-600">
                  <p>180 North King Street</p>
                  <p>Northhampton MA 1060</p>
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
                DHL – Takes up to 3 working days
              </p>
            </div>
            <div>
              <h4 className="font-bold">Payment Method</h4>
              <p className=" mt-2 text-gray-600">
                Apply Pay Mastercard ****1433
              </p>
            </div>
            <div>
              <h4 className="font-bold">Order Date</h4>
              <p className=" mt-2 text-gray-600">24 Sepetember, 2024</p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 mt-6 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>$56.00</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span className="text-green-500">- $28.00 (50%)</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>$8.00</span>
          </div>
          <div className="flex justify-between font-bold text-xl mt-4">
            <span>Total</span>
            <span className=" text-brand">$36.00</span>
          </div>
        </div>

        {/* Continue Shopping Button */}
        <div className="text-center mt-6 flex justify-end">
          <Link href="/products" className="px-6 py-2">
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
