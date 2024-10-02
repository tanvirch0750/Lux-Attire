import { models } from 'mongoose';
import { Schema, model, Types } from 'mongoose';

// Define the interface for the review schema
export interface IReview {
  user: Types.ObjectId | string;
  product: Types.ObjectId | string;
  order: Types.ObjectId | string;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  _id?: string;
}

// Define the review schema
const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create the review model
export const Review = models.Review ?? model('Review', reviewSchema);
