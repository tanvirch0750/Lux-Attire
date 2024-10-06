import React from 'react';
import { getNewArrivalProducts } from '@/db/actions-and-queries/products/products-queries';
import { TProduct } from '@/db/models/product-model';
import ProductCard from './product-list/ProductCard';

const NewArrivals = async () => {
  const newProducts = await getNewArrivalProducts();

  return (
    <div className="mb-2 mx-auto p-6 mt-6">
      <div className="flex items-center justify-between -mt-2 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8">
        <h3 className="text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading">
          New Arrivals
        </h3>
      </div>
      <div className="grid gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 bg-white grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {newProducts?.map((product: TProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
