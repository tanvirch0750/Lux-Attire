'use server';

import {
  createReview,
  updateReviewByProductAndUser,
} from '@/db/actions-and-queries/reviews/review-actions';
import { IReview } from '@/db/models/review-model';
import { isErrorWithMessage } from '@/lib/utils';
import { Types } from 'mongoose';

export async function createReviewAction(data: IReview) {
  try {
    const review = await createReview(data);
    return {
      data: review,
      status: 200,
    };
  } catch (e: unknown) {
    return {
      error: isErrorWithMessage(e) ? e.message : 'Unknown error occurred',
      status: 404,
    };
  }
}

export async function updateReviewByUserAction(
  reviewId: Types.ObjectId | string,
  userId: Types.ObjectId | string,
  productId: Types.ObjectId | string,
  orderId: Types.ObjectId | string,
  updateData: Partial<IReview>
) {
  try {
    const product = await updateReviewByProductAndUser(
      reviewId,
      userId,
      productId,
      orderId,
      updateData
    );
    return {
      data: product,
      status: 200,
    };
  } catch (e: unknown) {
    return {
      error: isErrorWithMessage(e) ? e.message : 'Unknown error occurred',
      status: 404,
    };
  }
}
