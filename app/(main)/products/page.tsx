import HeaderFilter from '../_components/product-list/HeaderFilter';
import SideFilter from '../_components/product-list/SideFilter';
import ProductList from '../_components/product-list/ProductList';
import { Suspense } from 'react';
import Loader from '@/components/Loader';

export const metadata = {
  title: 'All Products',
};

// export const revalidate = 3600;

interface SearchParams {
  search?: string;
  sort?: string | 'price-asc' | 'price-desc';
  color?: string;
  price?: string;
  category?: string;
}

export interface IFilters {
  search: string;
  sort: string;
  categories: string | string[] | undefined;
  colors: string[] | string | undefined;
  priceRanges: string | string[] | undefined;
}

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { search, sort, color, price, category } = searchParams;

  //Prepare filter conditions based on the extracted searchParams
  const filters: IFilters = {
    search: search || '',
    sort: sort || 'price-asc',
    colors: color,
    priceRanges: price,
    categories: category,
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

  console.log(filters);

  return (
    <section
      id="courses"
      className="space-y-6 dark:bg-transparent p-[24px] border-t"
    >
      <HeaderFilter filters={filters} />

      <section className="pb-24 pt-0">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <SideFilter />
          {/* products grid */}
          <Suspense
            fallback={
              <Loader text="Loding Products" className="lg:col-span-4" />
            }
          >
            <ProductList filters={filters} />
          </Suspense>
        </div>
      </section>
    </section>
  );
};

export default ProductsPage;
