'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAppDispatch } from '@/lib/hooks';
import { setSearch } from '@/lib/features/filterSlice';

const SearchProduct = () => {
  const dispatch = useAppDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value)); // Dispatch the search term to the Redux store
  };

  return (
    <div className="relative h-10 max-lg:w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search Products..."
        className="pl-8 pr-3 py-2 text-sm border-primary/30 lg:w-72"
        onChange={handleSearchChange} // Handle search input change
      />
    </div>
  );
};

export default SearchProduct;
