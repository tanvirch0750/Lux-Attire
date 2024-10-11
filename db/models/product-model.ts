import { Schema, model, models, Document, Types } from 'mongoose';

export interface IOffer {
  offerType: 'discount' | 'freeShipping';
  value: number;
  validUntil: Date | string;
  isActive?: boolean;
}

export interface ISizeStock {
  size: string;
  stock: number;
  isAvailable: boolean;
}

export interface IColorStock {
  color: string;
  sizeStocks: ISizeStock[]; // Stock information for each size within this color
}

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
    sizeStocks: ISizeStock[]; // New stock information for each color and size combination
  }[];
  sizes: {
    name: string;
    inStock: boolean; // Global inStock, but can be derived from sizeStocks
  }[];
  description: string;
  details: string[];
  isDeleted: boolean;
  offers: IOffer[];
}

export interface ICategory {
  label: string;
  value: string;
  isDeleted?: string;
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
    sizeStocks?: ISizeStock[];
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

const sizeStockSchema = new Schema<ISizeStock>({
  size: { type: String, required: true },
  stock: { type: Number, required: true }, // Stock for this specific size in a specific color
  isAvailable: { type: Boolean, default: true }, // Availability specific to this size
});

const colorStockSchema = new Schema<IColorStock>({
  color: { type: String, required: true },
  sizeStocks: [sizeStockSchema], // Array of size stock for each color
});

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
        sizeStocks: [sizeStockSchema], // Stock information for each size in this color
      },
    ],
    sizes: [
      {
        name: { type: String, required: true },
        inStock: { type: Boolean, required: true }, // Can derive this from sizeStocks for each color
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
