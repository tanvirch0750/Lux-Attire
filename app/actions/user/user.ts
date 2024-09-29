'use server';

import { updateUserById } from '@/db/actions-and-queries/user/user-actions';
import { IUser } from '@/db/models/user-model';
import { isErrorWithMessage } from '@/lib/utils';
import { Types } from 'mongoose';

export async function updateProfileAction(
  userId: Types.ObjectId | string,
  data: Partial<IUser>
) {
  try {
    const user = await updateUserById(userId, data);
    return {
      data: user,
      status: 200,
    };
  } catch (e: unknown) {
    return {
      error: isErrorWithMessage(e) ? e.message : 'Unknown error occurred',
      status: 404,
    };
  }
}
