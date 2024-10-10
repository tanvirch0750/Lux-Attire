import { Suspense } from 'react';
import HeaderFilter from '../../_components/product-list/HeaderFilter';
import SideFilter from '../../_components/product-list/SideFilter';
import Loader from '@/components/Loader';
import FreeShippingProductList from '../../_components/product-list/FreeShippingProductList';

interface SearchParams {
  search?: string;
  sort?: string | 'price-asc' | 'price-desc';
  color?: string;
  price?: string;
  page?: string | number;
  limit?: string | number;
}

export interface IFilters {
  search: string;
  sort: string;
  categories?: string | string[] | undefined;
  colors: string[] | string | undefined;
  priceRanges: string | string[] | undefined;
  page?: string | number | undefined;
  limit?: string | number | undefined;
}

export default async function FreeShippingProductPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { search, sort, color, price, page, limit } = searchParams;

  // Prepare filter conditions based on the extracted searchParams
  const filters: IFilters = {
    search: search || '',
    sort: sort || 'price-asc',
    colors: color,
    priceRanges: price,
    page: page || 1,
    limit: 12,
  };

  if (typeof filters.categories === 'string') {
    filters.categories = [filters.categories];
  }

  if (typeof filters.colors === 'string') {
    filters.colors = [filters.colors];
  }

  if (typeof filters.priceRanges === 'string') {
    filters.priceRanges = [filters.priceRanges];
  }

  return (
    <>
      <main>
        <h1 className="sr-only">Discount Products - Luxe Attire</h1>

        <section
          aria-label={`Discount Products and Filters`}
          className="space-y-6 dark:bg-transparent p-[24px] border-t"
        >
          <HeaderFilter filters={filters} />

          <div className="pb-24 pt-0">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <aside>
                <h2 className="sr-only">Product Filters</h2>
                <SideFilter isCategory={false} />
              </aside>

              <div className="lg:col-span-4">
                <h2 className="sr-only">Product List</h2>
                <Suspense
                  fallback={
                    <Loader text="Loading Products" className="lg:col-span-4" />
                  }
                  key={filters?.search || filters.sort}
                >
                  <FreeShippingProductList filters={filters} />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
