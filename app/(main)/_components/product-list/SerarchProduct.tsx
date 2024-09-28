'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SearchProduct = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    // Get the 'search' parameter from the URL
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchValue(searchParam);
    }
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value); // Update local state
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', value);

    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative h-10 max-lg:w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 h-4 w-4" />
      <Input
        type="text"
        placeholder="Search Products..."
        className="pl-8 pr-3 py-2 text-sm border-primary/30 lg:w-72"
        value={searchValue} // Bind the input value to local state
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchProduct;
