import mongoose, { Schema } from 'mongoose';

// Category interface
export interface IShippingMethod {
  shippingMethod: string;
  price: number;
  isDeleted?: boolean; // Change type to boolean
  _id?: string;
}

export interface ISettings {
  shippingPrice: IShippingMethod[]; // Change to array of shipping methods
  _id?: string;
}

// Define the Mongoose schema for Settings
const shippingMethodSchema = new Schema<IShippingMethod>(
  {
    shippingMethod: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: true,
  }
);

const settingsSchema = new Schema<ISettings>(
  {
    shippingPrice: [shippingMethodSchema], // Use the shipping method schema as an array
  },
  {
    timestamps: true,
  }
);

export const Settings =
  mongoose.models.Settings ?? mongoose.model('Settings', settingsSchema);
