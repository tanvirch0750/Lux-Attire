'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { toast } from 'react-toastify';
import { IOrderItem } from '@/db/models/order-model';
import { IReview } from '@/db/models/review-model';
import LoadingButton from '@/components/LodingButton';
import { updateReviewByUserAction } from '@/app/actions/review/review';

export function EditReview({
  product,
  user,
  order,
  review,
}: {
  product: IOrderItem;
  user: string;
  order: string;
  review: IReview;
}) {
  const [rating, setRating] = useState<number>(review?.rating || 0);
  const [comment, setComment] = useState<string>(review?.comment || '');
  const [loading, setLoading] = useState(false);

  // Handle star click to set rating
  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  // Update review
  const handleUpdateReview = async () => {
    // Validation: Check if both rating and comment are provided
    if (!comment.trim()) {
      toast.error('Please enter a review comment.', {
        position: 'top-center',
      });
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating.', {
        position: 'top-center',
      });
      return;
    }

    try {
      setLoading(true);

      const reviewData: IReview = {
        comment,
        product: product?.productId as string,
        rating,
        user: user,
        order: order,
      };

      const result = await updateReviewByUserAction(
        review?._id as string,
        user,
        product?.productId as string,
        order,
        reviewData
      );

      if (result.status === 200) {
        toast.success('Your review has been updated!', {
          position: 'top-center',
        });
      } else if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Failed to update review, please try again', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <span className="inline-block mr-4 bg-green-200 px-3 py-1 rounded-md text-green-800 font-semibold">
        Thank You For Your Review
      </span>
      <span className="text-green-800">|</span>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="text-brand">
            Edit Review
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl bg-white">
          <DialogHeader>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogDescription>
              Update your review for the product you purchased. Click save when
              you&rsquo;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Review Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="review" className="text-right">
                Your Review
              </Label>
              <Input
                id="review"
                placeholder="Your Review"
                className="col-span-3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Rating Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Your Rating
              </Label>
              <div className="col-span-3 flex space-x-2">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                  <Star
                    key={starIndex}
                    className={`h-6 w-6 cursor-pointer ${
                      starIndex <= rating
                        ? 'fill-current text-brand'
                        : 'text-gray-300'
                    }`}
                    onClick={() => handleStarClick(starIndex)}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <LoadingButton
              isLoading={loading}
              disabled={loading}
              label="Update Review"
              loadingLabel="Updating..."
              onClick={handleUpdateReview} // Update function
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
