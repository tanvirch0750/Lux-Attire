import HeaderFilter from '../_components/product-list/HeaderFilter';
import SideFilter from '../_components/product-list/SideFilter';
import ProductList from '../_components/product-list/ProductList';
import { Suspense } from 'react';
import Loader from '@/components/Loader';

export const revalidate = 3600;

const ProductsPage = async () => {
  return (
    <section
      id="courses"
      className="space-y-6 dark:bg-transparent p-[24px] border-t"
    >
      <HeaderFilter />

      <section className="pb-24 pt-0">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <SideFilter />
          {/* products grid */}
          <Suspense
            fallback={
              <Loader text="Loding Products" className="lg:col-span-4" />
            }
          >
            <ProductList />
          </Suspense>
        </div>
      </section>
    </section>
  );
};

export default ProductsPage;
