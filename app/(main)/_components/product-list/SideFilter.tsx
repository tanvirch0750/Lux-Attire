'use client';

import { Accordion } from '@/components/ui/accordion';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';

export default function SideFilter({
  isCategory = true,
}: {
  isCategory?: boolean;
}) {
  return (
    <>
      {/* Filters */}
      <div className="hidden lg:block">
        <Accordion defaultValue={['categories']} type="multiple">
          {/* Categories filter */}
          {isCategory && <CategoryFilter />}

          {/* Price filter */}
          <PriceFilter />
          {/* Color filter */}
          <ColorFilter />
        </Accordion>
      </div>
    </>
  );
}
