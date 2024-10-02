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
import { Star } from 'lucide-react'; // Use any icon library or SVG for stars
import { createReviewAction } from '@/app/actions/review/review';
import { toast } from 'react-toastify';
import { IOrderItem } from '@/db/models/order-model';
import { IReview } from '@/db/models/review-model';
import LoadingButton from '@/components/LodingButton';

export function AddaReview({
  product,
  user,
  order,
}: {
  product: IOrderItem;
  user: string;
  order: string;
}) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleAddReview = async () => {
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

      const result = await createReviewAction(reviewData);

      if (result.status === 200) {
        toast.success('Thank you for your review', {
          position: 'top-center',
        });
        // Optionally reset form fields
        setComment('');
        setRating(0);
      } else if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Review failed, please try again', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-brand">
          Add a review
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl bg-white">
        <DialogHeader>
          <DialogTitle>Add Review</DialogTitle>
          <DialogDescription>
            Give a review about the product you purchased. Click save when
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
            label="Add Review"
            loadingLabel="Processing..."
            onClick={handleAddReview}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
