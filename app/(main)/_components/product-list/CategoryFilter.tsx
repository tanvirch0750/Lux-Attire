'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { toggleCategory } from '@/lib/features/filterSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';

const CATEGORY_OPTIONS = [
  { id: 1, label: "Women's Collection", value: 'women-collection' },
  { id: 3, label: 'Active Wear', value: 'active-wear' },
  { id: 4, label: 'Kids Wear', value: 'kids-wear' },
  { id: 5, label: 'Traditional Clothing', value: 'traditional-clothing' },
  { id: 6, label: "Men's Wear", value: 'men-wear' },
  { id: 7, label: 'Accessories', value: 'accessories' },
];

export default function CategoryFilter() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state: RootState) => state.filters.categories
  );

  const handleCategoryChange = (value: string) => {
    dispatch(toggleCategory(value));
  };

  return (
    <AccordionItem value="categories" className="">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-gray-900 text-lg">Categories</span>
      </AccordionTrigger>

      <AccordionContent className="pt-6 animate-none">
        <ul className="space-y-4">
          {CATEGORY_OPTIONS.map((option) => (
            <li key={option.value} className="flex items-center">
              <Checkbox
                // @ts-ignore
                type="checkbox"
                id={`category-${option.id}`}
                onCheckedChange={() => handleCategoryChange(option.value)}
                checked={categories.includes(option.value)}
              />
              <label
                htmlFor={`category-${option.id}`}
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
