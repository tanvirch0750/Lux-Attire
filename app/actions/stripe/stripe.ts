'use server';

import { formatAmountForStripe } from '@/lib/stripe-helpers';
import { IOrder } from '@/db/models/order-model';
import { stripe } from '@/lib/stripe';
// import Stripe from 'stripe';

// http://localhost:3000/order-successful?session_id=cs_test_b1OzJRiBoMJNgNDppcDBSculawbjytmstgdXFbFXkE0OcgcHtuiCSYwUIx

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-06-20',

//   appInfo: {
//     name: 'Luxe Attire',
//   },
// });

const CURRENCY = 'usd';

export async function createCheckoutSession(order: IOrder) {
  const ui_mode = 'hosted';
  const origin = 'http://localhost:3000';

  console.log('stripe action', order);

  // Map order items to Stripe line items
  const line_items = order.orderItems.map((item) => ({
    quantity: item.quantity,
    price_data: {
      currency: CURRENCY,
      product_data: {
        name: `${item.name}---${item.size}---${item.color}---${item.image}---${item.price}---${item.productId}---${item.quantity}---${item.totalPrice}`,
        images: [item.image], // Add the product image
      },
      unit_amount: formatAmountForStripe(item.price, CURRENCY), // Convert to smallest unit for Stripe
    },
  }));

  const shippingLineItem = {
    quantity: 1,
    price_data: {
      currency: CURRENCY,
      product_data: {
        name: 'Shipping',
      },
      unit_amount: formatAmountForStripe(order.shippingPrice, CURRENCY), // Shipping price
    },
  };

  // @ts-ignore
  line_items.push(shippingLineItem);

  const metaOrderData = {
    user: order.user,
    email: order.email,
    shippingAddress: order.shippingAddress,
    paymentMethod: order.paymentMethod,
    phone: order.phone,
    itemsPrice: order.itemsPrice,
    shippingPrice: order.shippingPrice,
    totalPrice: order.totalPrice,
  };

  const checkoutSession = await stripe?.checkout?.sessions.create({
    mode: 'payment',
    submit_type: 'pay',
    line_items,
    customer_email: order.email, // Capture the customer's email
    payment_method_types: ['card'], // Use card payment

    ...(ui_mode === 'hosted' && {
      // Success & Cancel URLs
      success_url: `${origin}/order-successful?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
    }),

    metadata: {
      order: JSON.stringify(metaOrderData),
    },
  });

  return {
    client_secret: checkoutSession.client_secret,
    url: checkoutSession.url,
  };
}

export async function createPaymentIntent(order: IOrder) {
  const totalAmount = formatAmountForStripe(order.totalPrice, CURRENCY);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalAmount,
    currency: CURRENCY,
    payment_method_types: ['card'],
    receipt_email: order.email, // Customer email for the receipt
    shipping: {
      // @ts-ignore
      name: order.user?.name.toString(),
      address: {
        line1: order.shippingAddress,
      },
    },
    automatic_payment_methods: { enabled: true },
  });

  return { client_secret: paymentIntent.client_secret };
}
