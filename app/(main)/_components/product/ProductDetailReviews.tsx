import clsx from 'clsx';
import { StarIcon } from 'lucide-react';

type ReviewStats = {
  _id: string;
  averageRating: number;
  totalReviews: number;
};

export function ProductDetailReviews({
  reviewDetails,
}: {
  reviewDetails: ReviewStats;
}) {
  const { averageRating, totalReviews } = reviewDetails; // Destructure the review details

  return (
    <div className="mt-4">
      <h2 className="sr-only">Reviews</h2>

      {averageRating > 0 ? (
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            {averageRating}
            <span className="sr-only"> out of 5 stars</span>
          </p>
          <div className="ml-1 flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={clsx(
                  averageRating > rating ? 'text-brand' : 'text-gray-500',
                  'h-5 w-5 flex-shrink-0'
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
            ·
          </div>
          <div className="ml-4 flex">
            <a
              href="#"
              className="text-sm font-medium text-slate-600 hover:text-slate-500"
            >
              Total {totalReviews} reviews
            </a>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          No reviews yet for this product.
        </p>
      )}
    </div>
  );
}
