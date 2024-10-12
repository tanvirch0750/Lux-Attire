import mongoose, { Schema } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  password?: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
  bio?: string;
  socialMedia?: Record<string, string>;
  profilePicture?: string;
}

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    password: {
      required: false,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    phone: {
      required: false,
      type: String,
    },
    address: {
      required: false,
      type: String,
    },
    role: {
      required: false,
      type: String,
      default: 'user',
    },
    bio: {
      required: false,
      type: String,
    },
    socialMedia: {
      required: false,
      type: Object,
    },
    profilePicture: {
      required: false,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
