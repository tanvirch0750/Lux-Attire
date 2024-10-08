import { TProduct } from '@/db/models/product-model';
import ProductCard from './ProductCard';
import { getAllAvailableProductsWithQuery } from '@/db/actions-and-queries/products/products-queries';
import { IFilters } from '../../products/page';
import NoProductsFound from './NoProductsFound';

import PaginationDemo from './Pagination';

export default async function ProductList({ filters }: { filters: IFilters }) {
  const { products, totalPages, currentPage } =
    await getAllAvailableProductsWithQuery({
      ...filters,
    });

  if (!products?.length) {
    return (
      <div className="lg:col-span-4 flex flex-col flex-1 justify-center items-center h-full w-full">
        <NoProductsFound />
      </div>
    );
  }

  return (
    <div className="lg:col-span-4 flex flex-col">
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {products.map((product: TProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className=" mt-12 flex justify-end">
        {' '}
        <PaginationDemo currentPage={1} totalPages={totalPages} limit={12} />
      </div>
    </div>
  );
}
