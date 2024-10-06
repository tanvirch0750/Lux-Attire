import { User } from '@/db/models/user-model';
import { Types } from 'mongoose';

// Get user profile by email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return undefined;
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw new Error(
      'Error fetching user by email: ' + (error as Error).message
    );
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    throw new Error('Error fetching all users: ' + (error as Error).message);
  }
};

// Get user by ID
export const getUserById = async (userId: Types.ObjectId | string) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found');
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw new Error('Error fetching user by ID: ' + (error as Error).message);
  }
};
