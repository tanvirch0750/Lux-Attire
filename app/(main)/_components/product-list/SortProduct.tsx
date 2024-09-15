'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { setSort } from '@/lib/features/filterSlice';

import { useAppDispatch } from '@/lib/hooks';

const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

const SortProduct = () => {
  const dispatch = useAppDispatch();

  const handleSortChange = (value: string) => {
    dispatch(setSort(value));
  };

  return (
    <Select onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px] border-none !border-b focus:ring-0 focus:ring-offset-0 overflow-hidden">
        <SelectValue className=" text-lg" placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort Products</SelectLabel>
          {SORT_OPTIONS.map((option) => (
            <SelectItem
              className="cursor-pointer"
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortProduct;
