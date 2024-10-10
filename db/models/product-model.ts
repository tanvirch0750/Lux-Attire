import { Schema, model, models, Document, Types } from 'mongoose';

export interface IOffer {
  offerType: 'discount' | 'freeShipping';
  value: number;
  validUntil: Date | string;
  isActive?: boolean;
}

// Product interface
export interface IProduct {
  category: Types.ObjectId;
  name: string;
  price: number;
  isAvailable: boolean;
  images: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    primary: boolean;
    color: string;
  }[];
  colors: {
    name: string;
    bgColor: string;
    selectedColor: string;
  }[];
  sizes: {
    name: string;
    inStock: boolean;
  }[];
  description: string;
  details: string[];
  isDeleted: boolean;
  offers: IOffer;
}

export interface ICategory {
  label: string;
  value: string;
  isDeleted?: string;
  _id?: string;
}

// Product interface
export interface IProductFrontend {
  category: Types.ObjectId;
  productId: number;
  name: string;
  price: number;
  isAvailable: boolean;
  images: {
    id: string;
    imageSrc: string;
    imageAlt: string;
    color: string;
    primary: boolean;
  }[];
  colors: {
    name: string;
    bgColor: string;
    selectedColor: string;
  }[];
  sizes: {
    name: string;
    inStock: boolean;
  }[];
  description: string;
  details: string[];
  isDeleted: boolean;
  _id?: string;
}

export type TProduct = {
  category: ICategory;
  productId: string;
  name: string;
  price: number;
  isAvailable: boolean;
  images: {
    id: string;
    imageSrc: string;
    imageAlt: string;
    color: string;
    primary: boolean;
  }[];
  colors: {
    name: string;
    bgColor: string;
    selectedColor: string;
  }[];
  sizes: {
    name: string;
    inStock: boolean;
  }[];
  description: string;
  details: string[];
  isDeleted: boolean;
  offers?: IOffer[];
  averageRating?: number;
  totalReviews?: number;
  _id?: string;
};

// Define the Mongoose schema for Settings
const offerSchema = new Schema<IOffer>(
  {
    offerType: {
      type: String,
      enum: ['discount', 'freeShipping'],
      required: true,
    },
    value: { type: Number, required: true }, // Could be discount percentage or fixed value
    validUntil: { type: String, required: true }, // Offer expiration date
    isActive: { type: Boolean, default: true }, // Whether the offer is currently active
  },
  {
    _id: true,
  }
);

// Mongoose document type for Product, which includes IProduct fields
export interface ProductDocument extends IProduct, Document {}

// Define the Mongoose schema for Product
const productSchema = new Schema<ProductDocument>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    images: [
      {
        id: { type: String, required: true },
        imageSrc: { type: String, required: true },
        imageAlt: { type: String, required: true },
        color: { type: String, required: true },
        primary: { type: Boolean, required: true },
      },
    ],
    colors: [
      {
        name: { type: String, required: true },
        bgColor: { type: String, required: true },
        selectedColor: { type: String, required: true },
      },
    ],
    sizes: [
      {
        name: { type: String, required: true },
        inStock: { type: Boolean, required: true },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    details: [{ type: String, required: true }],
    isDeleted: {
      type: Boolean,
      default: false, // By default, a product is not deleted
    },
    offers: [offerSchema],
  },
  {
    timestamps: true,
  }
);

export const Product =
  models.Product ?? model<ProductDocument>('Product', productSchema);
