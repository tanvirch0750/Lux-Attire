import { getReviewsByProduct } from '@/db/actions-and-queries/reviews/review-query';

import { ReviewsContainer } from './ReviewsContainer';

export async function Reviews({ productId }: { productId: string }) {
  const reviews = await getReviewsByProduct(productId);

  return <ReviewsContainer reviews={reviews} />;
}
