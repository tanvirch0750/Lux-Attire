import { TProduct } from '@/db/models/product-model';
import ProductCard from './ProductCard';
import { getAllAvailableProducts } from '@/db/actions-and-queries/products/products-queries';

export default async function ProductList() {
  const products = await getAllAvailableProducts();

  if (!products?.length) return null;

  return (
    <div className="lg:col-span-4 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {products?.map((product: TProduct) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
