'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import {
  toggleCategory,
  toggleColor,
  togglePriceRange,
} from '@/lib/features/filterSlice';

const PRICE_OPTIONS = [
  { label: 'Under 400', value: 'under 400' },
  { label: '400 - 800', value: '400-800' },
  { label: '800 - 1200', value: '800-1200' },
  { label: 'Above 1200', value: 'above 1200' },
];

const CATEGORY_OPTIONS = [
  { id: 1, label: "Women's Collection", value: 'women-collection' },
  { id: 3, label: 'Active Wear', value: 'active-wear' },
  { id: 4, label: 'Kids Wear', value: 'kids-wear' },
  { id: 5, label: 'Traditional Clothing', value: 'traditional-clothing' },
  { id: 6, label: "Men's Wear", value: 'men-wear' },
  { id: 7, label: 'Accessories', value: 'accessories' },
];

const COLOR_OPTIONS = [
  { label: 'Blue', value: 'blue' },
  { label: 'Red', value: 'red' },
  { label: 'Yellow', value: 'yellow' },
];

const FilterProductMobile = () => {
  const dispatch = useAppDispatch();
  const { categories, colors, priceRanges } = useAppSelector(
    (state: RootState) => state.filters
  );

  const handleFilterChange = (
    type: 'categories' | 'color' | 'priceRanges',
    value: string,
    isChecked: boolean
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
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Filter className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-white">
          <SheetHeader>
            <SheetTitle className="text-left">Filter Products</SheetTitle>
            <SheetClose>
              <X className="h-6 w-6" />
            </SheetClose>
          </SheetHeader>
          <Accordion defaultValue={['categories']} type="multiple">
            {/* Categories filter */}
            <AccordionItem value="categories">
              <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">Categories</span>
              </AccordionTrigger>
              <AccordionContent className="pt-6 animate-none">
                <ul className="space-y-4">
                  {CATEGORY_OPTIONS.map((option) => (
                    <li key={option.value} className="flex items-center">
                      <Checkbox
                        // @ts-ignore
                        type="checkbox"
                        id={`category-${option.id}`}
                        onCheckedChange={(isChecked) =>
                          handleFilterChange(
                            'categories',
                            option.value,
                            // @ts-ignore
                            isChecked
                          )
                        }
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
            {/* Price filter */}
            <AccordionItem value="price">
              <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">Price</span>
              </AccordionTrigger>
              <AccordionContent className="pt-6 animate-none">
                <ul className="space-y-4">
                  {PRICE_OPTIONS.map((option) => (
                    <li key={option.value} className="flex items-center">
                      <Checkbox
                        // @ts-ignore
                        type="checkbox"
                        id={`price-${option.value}`}
                        onCheckedChange={(isChecked) =>
                          handleFilterChange(
                            'priceRanges',
                            option.value,
                            // @ts-ignore
                            isChecked
                          )
                        }
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
            {/* Color filter */}
            <AccordionItem value="color">
              <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">Color</span>
              </AccordionTrigger>
              <AccordionContent className="pt-6 animate-none">
                <ul className="space-y-4">
                  {COLOR_OPTIONS.map((option) => (
                    <li key={option.value} className="flex items-center">
                      <Checkbox
                        // @ts-ignore
                        type="checkbox"
                        id={`color-${option.value}`}
                        onCheckedChange={(isChecked) =>
                          // @ts-ignore
                          handleFilterChange('color', option.value, isChecked)
                        }
                        checked={colors.includes(option.value)}
                      />
                      <label
                        htmlFor={`color-${option.value}`}
                        className="ml-3 text-sm text-gray-600 cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterProductMobile;
