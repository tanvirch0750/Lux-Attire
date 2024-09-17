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

export default function Checkout() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
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

  const handleSubmit = () => {
    if (validateForm()) {
      if (formData.paymentMethod === 'cash') {
        // Handle "Place Order" logic for Cash on Delivery
        alert('Order placed with Cash on Delivery');
      } else if (formData.paymentMethod === 'stripe') {
        // Handle "Pay Now" logic for Stripe
        alert('Proceeding to payment with Stripe');
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-10 mb-20">
      <div className="px-4 pt-8">
        {/* Order Summary */}
        <p className="text-xl font-medium">Order Summary</p>
        <p className="text-gray-400">
          Check your items. And select a suitable shipping method.
        </p>
        {/* Cart details */}
        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
          <div className="flex flex-col rounded-lg bg-white sm:flex-row">
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src="https://img.freepik.com/free-photo/pleased-young-pretty-woman-looking-front-doing-peace-sign-isolated-olive-green-wall_141793-109830.jpg?uid=R163516477&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
              alt=""
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">
                Nike Air Max Pro 8888 - Super Light
              </span>
              <span className="float-right text-gray-400">42EU - 8.5US</span>
              <p className="text-lg">$138.99</p>
            </div>
          </div>
          <div className="flex flex-col rounded-lg bg-white sm:flex-row">
            <img
              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
              src="https://img.freepik.com/free-photo/pleased-young-pretty-woman-looking-front-doing-peace-sign-isolated-olive-green-wall_141793-109830.jpg?uid=R163516477&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
              alt=""
            />
            <div className="flex w-full flex-col px-4 py-4">
              <span className="font-semibold">
                Nike Air Max Pro 8888 - Super Light
              </span>
              <span className="float-right text-gray-400">42EU - 8.5US</span>
              <p className="text-lg">$138.99</p>
            </div>
          </div>
        </div>

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
        <p className="text-gray-400">
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
              <p className="font-semibold text-gray-900">$399.00</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Shipping</p>
              <p className="font-semibold text-gray-900">$8.00</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900">$408.00</p>
          </div>

          {/* Submit Button */}
          <button
            disabled={!formData.paymentMethod}
            onClick={handleSubmit}
            className={`mt-4 mb-8 w-full rounded-md bg-orange-600 px-6 py-3 font-medium text-white ${
              !formData.paymentMethod ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {formData.paymentMethod === 'cash' ? 'Place Order' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
