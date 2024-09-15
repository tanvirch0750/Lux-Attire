'use client';

import { Button } from '@/components/ui/button';
import {
  toggleCategory,
  toggleColor,
  togglePriceRange,
} from '@/lib/features/filterSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { X } from 'lucide-react';

const ActiveFilters = () => {
  const dispatch = useAppDispatch();
  const { categories, colors, priceRanges } = useAppSelector(
    (state: RootState) => state.filters
  );

  const handleRemoveFilter = (
    type: 'categories' | 'color' | 'priceRanges',
    value: string
  ) => {
    if (type === 'categories') {
      dispatch(toggleCategory(value));
    } else if (type === 'color') {
      dispatch(toggleColor(value));
    } else if (type === 'priceRanges') {
      dispatch(togglePriceRange(value));
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Active Categories */}
      {categories.length > 0 &&
        categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
            onClick={() => handleRemoveFilter('categories', category)}
          >
            {category}
            <X className="w-3" />
          </Button>
        ))}

      {/* Active Prices */}
      {priceRanges.length > 0 &&
        priceRanges.map((price) => (
          <Button
            key={price}
            variant="ghost"
            className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
            onClick={() => handleRemoveFilter('priceRanges', price)}
          >
            {price}
            <X className="w-3" />
          </Button>
        ))}

      {/* Active Colors */}
      {colors.length > 0 &&
        colors.map((color) => (
          <Button
            key={color}
            variant="ghost"
            className="text-xs h-7 bg-muted rounded-full gap-1 text-sky-700"
            onClick={() => handleRemoveFilter('color', color)}
          >
            {color}
            <X className="w-3" />
          </Button>
        ))}
    </div>
  );
};

export default ActiveFilters;
