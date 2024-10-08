import { TProduct } from '@/db/models/product-model';
import ProductCard from './ProductCard';
import { getProductsByCategoryValue } from '@/db/actions-and-queries/products/products-queries';

import NoProductsFound from './NoProductsFound';
import { IFilters } from '../../products/[category]/page';

export default async function CategoryproductList({
  filters,
  categoryValue,
}: {
  filters: IFilters;
  categoryValue: string;
}) {
  const products: TProduct[] = await getProductsByCategoryValue(categoryValue);

  const { search, sort, colors, priceRanges } = filters;

  const filteredProducts = products
    ?.filter((product) => {
      // Filter by search keyword (name or description)
      if (
        search &&
        !product.name.toLowerCase().includes(search.toLowerCase())
      ) {
        return false;
      }

      // Normalize colors to lowercase for case-insensitive comparison
      const filterColors = colors as string[];
      const normalizedColors = filterColors?.map((color) =>
        color.toLowerCase()
      );

      // Filter by colors
      if (
        normalizedColors?.length &&
        !product.colors.some((color) =>
          normalizedColors.includes(color.name.toLowerCase())
        )
      ) {
        return false;
      }

      // Filter by price range (assuming product.price is a number)
      if (priceRanges?.length) {
        let isInRange = false;
        for (const range of priceRanges) {
          if (range === 'under-100' && product.price < 100) isInRange = true;
          if (
            range === '100-200' &&
            product.price >= 100 &&
            product.price <= 200
          )
            isInRange = true;
          if (
            range === '201-300' &&
            product.price > 200 &&
            product.price <= 300
          )
            isInRange = true;
          if (range === 'above-300' && product.price > 300) isInRange = true;
        }
        if (!isInRange) return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sort by price
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'price-asc') return a.price - b.price;
      return 0;
    });

  if (!filteredProducts?.length)
    return (
      <div className="lg:col-span-4 flex flex-col flex-1 justify-center items-center h-full w-full">
        <NoProductsFound />
      </div>
    );

  return (
    <div className="lg:col-span-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {filteredProducts?.map((product: TProduct) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
