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

export function AddaReview() {
  const [rating, setRating] = useState<number>(0);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
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
          <Button type="submit" className="bg-brand hover:bg-brand/90">
            Add Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
