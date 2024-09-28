import { Search } from 'lucide-react';

const NoProductsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center  p-4">
      <Search className="w-16 h-16 text-gray-400 mb-4 " />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        No Products Found
      </h2>
      <p className="text-gray-600 text-center mb-6 max-w-xl">
        We couldn&apos;t find any products matching your search criteria. Please
        try different keywords or filters.
      </p>
    </div>
  );
};

export default NoProductsFound;
