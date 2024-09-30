import { Schema, model, models } from 'mongoose';
import { customAlphabet } from 'nanoid';

interface IOrderItem {
  productId: Schema.Types.ObjectId | string;
  name: string;
  quantity: number;
  image: string;
  price: number;
  size: string;
  color: string;
  totalPrice: number;
}

export type IOrder = {
  _id?: string;
  orderId?: string;
  user?: Schema.Types.ObjectId | string;
  orderItems: IOrderItem[];
  shippingAddress: string;
  paymentMethod: string; // e.g., 'cashOnDelivery', 'stripe',
  itemsPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid?: boolean;
  orderStatus?: string; // Delivered | Pending | Canceled
  createdAt?: Date;
  isDeleted?: boolean;
  email: string;
  phone: string;
};

const nanoid = customAlphabet('0123456789', 8);

const orderSchema = new Schema<IOrder>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the user model
    },
    orderId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(),
    },
    orderItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product', // Reference to the product model
        },
        name: { type: String, required: true },
        image: { type: String, required: true },
        size: { type: String, required: true },
        color: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
      },
    ],
    shippingAddress: { type: String, required: true },
    paymentMethod: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    orderStatus: {
      type: String,
      required: true,
      default: 'pending',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Order = models.Order ?? model('Order', orderSchema);
