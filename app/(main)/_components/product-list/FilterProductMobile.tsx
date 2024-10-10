'use client';

import { Accordion } from '@/components/ui/accordion';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { X } from 'lucide-react';

import { Filter } from 'lucide-react';
// import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';

const FilterProductMobile = () => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger>
          <Filter className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-white">
          <SheetHeader>
            <SheetTitle className="text-left">Filter Products</SheetTitle>
          </SheetHeader>
          <Accordion defaultValue={['categories']} type="multiple">
            {/* Categories filter */}
            <CategoryFilter />
            {/* Price filter */}
            <PriceFilter />

            {/* color filter */}
            <ColorFilter />
          </Accordion>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterProductMobile;
