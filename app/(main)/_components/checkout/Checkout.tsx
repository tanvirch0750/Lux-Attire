'use client';

import React, { useState } from 'react';
import {
  CreditCardIcon,
  HandshakeIcon,
  IdCardIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from 'lucide-react';
import CartDetails from './CartDetails';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { IUser } from '@/db/models/user-model';
import { IOrder } from '@/db/models/order-model';
import { createOrderAction } from '@/app/actions/order/order';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { createCheckoutSession } from '@/app/actions/stripe/stripe';
import LoadingButton from '@/components/LodingButton';
import { sendEmails } from '@/lib/email';

export default function Checkout({ user }: { user: IUser }) {
  const cartItems = useSelector((state: RootState) => state.cart);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    paymentMethod: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    paymentMethod: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handlePaymentChange = (method: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
    setErrors((prev) => ({ ...prev, paymentMethod: '' }));
  };

  const validateForm = () => {
    const newErrors = {
      email: '',
      name: '',
      phone: '',
      address: '',
      paymentMethod: '',
    };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    }
    if (!formData.address) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const shippingPrice = 8;

  const createOrderData = (paymentMethod: string, isPaid: boolean = false) => ({
    user: user?._id,
    paymentMethod,
    orderItems: cartItems?.items?.map((item) => ({
      productId: item?.productId,
      color: item?.color?.name,
      image: item?.image?.imageSrc,
      name: item?.name,
      price: item?.price,
      quantity: item?.quantity,
      size: item?.size?.name,
      totalPrice: item?.quantity * item?.price,
    })),
    shippingAddress: formData?.address,
    email: formData?.email,
    phone: formData?.phone,
    itemsPrice: cartItems?.totalPrice,
    shippingPrice: shippingPrice,
    totalPrice: cartItems?.totalPrice + shippingPrice,
    isPaid,
  });

  const handlePayment = async (orderData: IOrder, paymentMethod: string) => {
    try {
      setLoading(true);

      if (paymentMethod === 'cashOnDelivery') {
        const result = await createOrderAction(orderData, user?._id);

        if (result.status === 200) {
          toast.success('Your order placed successfully', {
            position: 'top-center',
          });

          const emailsToSend = [
            {
              to: formData?.email,
              subject: 'Your Order with Luxe Attire is Confirmed!',
              message: `Thank you for shopping with Luxe Attire! We're excited to let you know that your order has been successfully placed.`,
            },
            {
              to: 'tanvirch7575@gmail.com',
              subject: 'New Order is confirmed',
              message: `A new order has been placed through Luxe Attire. `,
            },
          ];

          const emailres = await sendEmails(emailsToSend);
          console.log('email res', emailres);

          router.push(`/order-successful/${result?.data?._id}-${user?._id}`);
        } else {
          toast.error(result?.error || 'Order placement failed', {
            position: 'top-center',
          });
        }
      } else if (paymentMethod === 'stripe') {
        const stripeResult = await createCheckoutSession(orderData);
        if (stripeResult?.url) {
          router.push(`${stripeResult?.url}`);
        } else {
          toast.error('Payment Failed', { position: 'top-center' });
        }
      }
    } catch (error) {
      toast.error(
        paymentMethod === 'cashOnDelivery'
          ? 'Order placement Failed, Something went wrong'
          : 'Payment Failed',
        { position: 'top-center' }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const paymentMethod =
      formData.paymentMethod === 'cash' ? 'cashOnDelivery' : 'stripe';
    const orderData = createOrderData(paymentMethod);

    await handlePayment(orderData, paymentMethod);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 mb-20">
      <div className="px-4 pt-8">
        {/* Order Summary */}
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-600">
          Check your items. And select a suitable shipping method.
        </p>
        {/* Cart details */}
        <CartDetails cartItems={cartItems?.items} />

        {/* Shipping Methods */}
        <div>
          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                onChange={() => handlePaymentChange('cash')}
                checked={formData.paymentMethod === 'cash'}
              />
              <span className="peer-checked:border-brand absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className={`peer-checked:border-2 peer-checked:border-brand peer-checked:bg-gray-50 flex items-center cursor-pointer select-none rounded-lg border border-gray-300 p-4 ${
                  errors.paymentMethod && 'border-red-500'
                }`}
                htmlFor="radio_1"
              >
                <HandshakeIcon className="w-14 text-brand" size={40} />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Cash On Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                onChange={() => handlePaymentChange('stripe')}
                checked={formData.paymentMethod === 'stripe'}
              />
              <span className="peer-checked:border-brand absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className={`peer-checked:border-2 peer-checked:border-brand peer-checked:bg-gray-50 flex items-center cursor-pointer select-none rounded-lg border border-gray-300 p-4 ${
                  errors.paymentMethod && 'border-red-500'
                }`}
                htmlFor="radio_2"
              >
                <CreditCardIcon className="w-14 text-brand" size={40} />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Pay with Stripe</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
            )}
          </form>
        </div>
      </div>

      {/* Payment Details */}
      <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
        <p className="text-xl font-medium">Payment Details</p>
        <p className="text-gray-600">
          Complete your order by providing your payment details.
        </p>
        <div>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full rounded-md border px-4 py-3 pl-11 text-sm shadow-sm outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <MailIcon className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Your Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full rounded-md border px-4 py-3 pl-11 text-sm shadow-sm outline-none ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Your full name here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <UserIcon className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full rounded-md border px-4 py-3 pl-11 text-sm shadow-sm outline-none ${
                  errors.phone ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="+123 456 7890"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <PhoneIcon className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full rounded-md border px-4 py-3 pl-11 text-sm shadow-sm outline-none ${
                  errors.address ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Your address here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <IdCardIcon className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* <!-- Total --> */}
          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Subtotal</p>
              <p className="font-semibold text-gray-900">
                ${cartItems?.totalPrice}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">$8.00</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">
              ${cartItems?.totalPrice + shippingPrice}
            </p>
          </div>

          {/* Submit Button */}
          <LoadingButton
            className="mt-4 mb-8 w-full rounded-md bg-orange-600 px-6 py-3 font-medium text-white"
            isLoading={loading}
            onClick={handleSubmit}
            disabled={!formData.paymentMethod || loading}
            label={
              formData.paymentMethod === 'cash' ? 'Place Order' : 'Pay Now'
            }
            loadingLabel="Processing..."
          />
        </div>
      </div>
    </div>
  );
}
