'use client';

import { useState } from 'react';
import { IReview } from '@/db/models/review-model';
import Review from './Review';
import { Button } from '@/components/ui/button';

interface ReviewsContainerProps {
  reviews: IReview[];
}

export function ReviewsContainer({ reviews }: ReviewsContainerProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews?.slice(0, 5);

  return (
    <section aria-labelledby="reviews-heading" className="mt-16 sm:mt-24">
      <h2 id="reviews-heading" className="text-lg font-medium text-gray-900">
        Recent reviews
      </h2>

      <div className="mt-6 space-y-10 divide-y divide-gray-200 border-b border-t border-gray-200 pb-10">
        {displayedReviews?.length ? (
          <>
            {displayedReviews.map((review: IReview) => (
              <Review review={review} key={review?._id} />
            ))}

            {/* Conditional rendering of buttons based on showAll state */}
            <div className="mt-4 flex items-center justify-end">
              {!showAll && reviews?.length > 5 && (
                <Button
                  variant="link"
                  onClick={() => setShowAll(true)}
                  className="text-lg font-medium text-brand hover:text-brand/90 pt-10"
                >
                  See More Reviews
                </Button>
              )}

              {showAll && (
                <Button
                  variant="link"
                  onClick={() => setShowAll(false)}
                  className="text-lg font-medium text-brand hover:text-brand/90 pt-10"
                >
                  Show less
                </Button>
              )}
            </div>
          </>
        ) : (
          <p className="pt-8">No reviews found for this product</p>
        )}
      </div>
    </section>
  );
}
