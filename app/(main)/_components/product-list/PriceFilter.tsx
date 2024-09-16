'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { togglePriceRange } from '@/lib/features/filterSlice';
// import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';

const PRICE_OPTIONS = [
  { label: 'Under 400', value: 'under 400' },
  { label: '400 - 800', value: '400-800' },
  { label: '800 - 1200', value: '800-1200' },
  { label: 'Above 1200', value: 'above 1200' },
];

export default function PriceFilter() {
  const dispatch = useDispatch();
  const priceRanges = useSelector(
    (state: RootState) => state.filters.priceRanges
  );

  const handlePriceRangeChange = (value: string) => {
    dispatch(togglePriceRange(value));
  };

  return (
    <AccordionItem value="price">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-primary text-lg">Price Range</span>
      </AccordionTrigger>

      <AccordionContent className="pt-6 animate-none">
        <ul className="space-y-4">
          {PRICE_OPTIONS.map((option) => (
            <li key={option.value} className="flex items-center">
              <Checkbox
                // @ts-ignore
                type="checkbox"
                id={`price-${option.value}`}
                onCheckedChange={() => handlePriceRangeChange(option.value)}
                checked={priceRanges.includes(option.value)}
              />
              <label
                htmlFor={`price-${option.value}`}
                className="ml-3 text-sm text-gray-600 cursor-pointer"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
