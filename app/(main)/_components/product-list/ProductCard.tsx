import { TProduct } from '@/db/models/product-model';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }: { product: TProduct }) {
  '/products/womens-collection/123';
  return (
    <Link href={`/products/${product?.category?.value}/${product._id}`}>
      <div
        className="group box-border overflow-hidden flex rounded-md cursor-pointer pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
        role="button"
        title="Roadster Women Round Neck"
      >
        <div className="flex mb-3 md:mb-3.5 relative">
          <Image
            alt="Roadster Women Round Neck"
            src={product?.images.filter((image) => image.primary)[0].imageSrc}
            width={750}
            height={750}
            className="bg-gray-300 object-cover rounded-s-md w-full transition duration-200 ease-in rounded-md group-hover:rounded-b-none h-[300px]"
          />
        </div>
        <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
          <h2 className="truncate mb-1 text-sm md:text-base font-semibold text-heading group-hover:text-brand">
            {product?.name}
          </h2>
          <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
            {product.description?.substring(0, 100)}...
          </p>
          <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading">
            <span className="inline-block false">${product?.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
