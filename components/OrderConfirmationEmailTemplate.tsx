import { IOrder } from '@/db/models/order-model';
import React from 'react';

const OrderConfirmationEmailTemplate = ({
  order,
}: {
  order: Partial<IOrder>;
}) => {
  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Order Confirmation</h1>
        </div>

        <div className="mb-4">
          <p>
            Thank you for your purchase! Your order with id{' '}
            <span className="text-green-600">#{order?.orderId}</span> has been
            confirmed. Below are your order details:
          </p>
        </div>

        <div className="mb-4">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Price</th>
              </tr>
            </thead>
            <tbody>
              {order?.orderItems?.map((product, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.quantity}</td>
                  <td className="py-2 px-4 border-b">
                    ${product.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={2}
                  className="font-bold text-gray-800 py-2 px-4 border-t"
                >
                  Total:
                </td>
                <td className="font-bold text-gray-800 py-2 px-4 border-t">
                  ${order?.totalPrice!.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Shipping Details</h2>
          <p>{order?.shippingAddress}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Payment Details</h2>
          <p>{order?.isPaid ? 'Paid' : 'Cash On Delivery'}</p>
        </div>

        <div className="text-center text-sm text-gray-600 mt-4">
          <p>
            Need help with your order?{' '}
            <a
              href="mailto:tanvirch7575@gmail.com"
              className="text-blue-600 hover:underline"
            >
              Contact our support team
            </a>
            .
          </p>
          <p>Thank you for shopping with us!</p>
          <p>&copy; 2024 Your Company Name</p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationEmailTemplate;
