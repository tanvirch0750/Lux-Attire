import { Schema, model, models } from 'mongoose';

// Category interface
export interface ICategory {
  label: string;
  value: string;
  _id?: string;
}

// Define the Mongoose schema for Category
const categorySchema = new Schema<ICategory>({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
});

// Export the Category model using the formula
export const Category = models.Category ?? model('Category', categorySchema);
