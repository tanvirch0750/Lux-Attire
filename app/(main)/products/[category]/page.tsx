import { Suspense } from 'react';
import HeaderFilter from '../../_components/product-list/HeaderFilter';
import SideFilter from '../../_components/product-list/SideFilter';
import Loader from '@/components/Loader';
import CategoryproductList from '../../_components/product-list/CategoryP;roductList';

export const metadata = {
  title: 'Products by Category',
};

interface SearchParams {
  search?: string;
  sort?: string | 'price-asc' | 'price-desc';
  color?: string;
  price?: string;
}

export interface IFilters {
  search: string;
  sort: string;
  categories?: string | string[] | undefined;
  colors: string[] | string | undefined;
  priceRanges: string | string[] | undefined;
}

export default async function ProductCategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: SearchParams;
}) {
  const { search, sort, color, price } = searchParams;
  const category = params?.category;

  // Prepare filter conditions based on the extracted searchParams
  const filters: IFilters = {
    search: search || '',
    sort: sort || 'price-asc',
    colors: color,
    priceRanges: price,
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
    <section
      id="products"
      className="space-y-6 dark:bg-transparent p-[24px] border-t"
    >
      {/* Filters header */}
      <HeaderFilter filters={filters} />

      <section className="pb-24 pt-0">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          {/* Side filters */}
          <SideFilter isCategory={false} />

          {/* Products grid */}
          <Suspense
            fallback={
              <Loader text="Loading Products" className="lg:col-span-4" />
            }
            key={filters?.search || filters.sort}
          >
            {/* Fetch and display products by category */}
            <CategoryproductList filters={filters} categoryValue={category} />
          </Suspense>
        </div>
      </section>
    </section>
  );
}
