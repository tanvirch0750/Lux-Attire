import { IUser, User } from '@/db/models/user-model';
import { Types } from 'mongoose';
import { revalidatePath } from 'next/cache';
import { dbConnect } from '@/db/service/mongo';

function isMongoError(error: unknown): error is { code: number } {
  return typeof error === 'object' && error !== null && 'code' in error;
}

export const updateUserById = async (
  userId: Types.ObjectId | string,
  updateData: Partial<IUser>
) => {
  await dbConnect();
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      throw new Error('User not found');
    }

    revalidatePath('/my-profile');
    revalidatePath('/checkout');

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    // Use the type guard to check for MongoDB-specific error
    if (isMongoError(error) && error.code === 11000) {
      throw new Error('User already exists');
    }

    // Fallback to throwing the generic error with its message
    if (error instanceof Error) {
      throw new Error('Error updating user: ' + error.message);
    }
    throw new Error('Unknown error occurred');
  }
};
