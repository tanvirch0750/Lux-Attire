import { Accordion } from '@/components/ui/accordion';
import CategoryFilter from './CategoryFilter';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';

export default function SideFilter() {
  return (
    <>
      {/* Filters */}
      {/* these component can be re use for mobile also */}
      <div className="hidden lg:block">
        <Accordion defaultValue={['categories']} type="multiple">
          {/* Categories filter */}
          <CategoryFilter />
          {/* Price filter */}
          <PriceFilter />

          {/* color filter */}
          <ColorFilter />
        </Accordion>
      </div>
    </>
  );
}
