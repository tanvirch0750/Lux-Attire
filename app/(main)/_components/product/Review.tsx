import { IReview } from '@/db/models/review-model';
import { formatDateAndTime } from '@/lib/utils';
import clsx from 'clsx';
import { StarIcon } from 'lucide-react';

export default function Review({ review }: { review: IReview }) {
  const createdAtString =
    review?.createdAt instanceof Date
      ? review?.createdAt.toISOString()
      : review?.createdAt || '';
  const { date, time } = formatDateAndTime(createdAtString);

  return (
    <div key={review._id} className="pt-10 lg:grid lg:grid-cols-12 lg:gap-x-8">
      <div className="lg:col-span-8 lg:col-start-5 xl:col-span-9 xl:col-start-4 xl:grid xl:grid-cols-3 xl:items-start xl:gap-x-8">
        <div className="flex items-center xl:col-span-1">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <StarIcon
                key={rating}
                className={clsx(
                  review?.rating >= rating ? 'text-brand' : 'text-gray-700', // Fill stars based on rating
                  'h-5 w-5 flex-shrink-0'
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="ml-3 text-sm text-gray-700">
            {review.rating}
            <span className="sr-only"> out of 5 stars</span>
          </p>
        </div>

        <div className="mt-4 lg:mt-6 xl:col-span-2 xl:mt-0">
          <h2 className="font-medium text-gray-900">Comment</h2>
          <p className="mt-3 space-y-6 text-sm text-gray-500">
            {review?.comment}
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center text-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex-col lg:items-start xl:col-span-3">
        {/* @ts-ignore */}
        <p className="font-medium text-gray-900">{review?.user?.name}</p>

        <time className="ml-4 border-l border-gray-200 pl-4 text-gray-500 lg:ml-0 lg:mt-2 lg:border-0 lg:pl-0">
          {date}, {time}
        </time>
      </div>
    </div>
  );
}
