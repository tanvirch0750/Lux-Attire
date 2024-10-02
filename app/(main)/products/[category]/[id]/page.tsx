import AddToCart from '@/app/(main)/_components/product/AddToCart';
import { ImageGallery } from '@/app/(main)/_components/product/ImageGallery';
import { Materials } from '@/app/(main)/_components/product/Materials';
import { ProductDetailReviews } from '@/app/(main)/_components/product/ProductDetailReviews';
import { ProductDetails } from '@/app/(main)/_components/product/ProductDetails';
import { ProductHeading } from '@/app/(main)/_components/product/ProductHeading';
import { RelatedProducts } from '@/app/(main)/_components/product/RelatedProducts';
import { Reviews } from '@/app/(main)/_components/product/Reviews';
import Loader from '@/components/Loader';
import { getProductById } from '@/db/actions-and-queries/products/products-queries';
import { getReviewStatsByProduct } from '@/db/actions-and-queries/reviews/review-query';
import { TProduct } from '@/db/models/product-model';
import { Suspense } from 'react';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product: TProduct = await getProductById(params?.id);

  return { title: `${product?.name}` };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product: TProduct = await getProductById(params?.id);
  const reviewDetails = await getReviewStatsByProduct(params?.id);

  console.log('review details', reviewDetails);

  return (
    <div className="bg-white border-t">
      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-2">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <ProductHeading name={product?.name} price={product?.price} />
            <ProductDetailReviews reviewDetails={reviewDetails} />
          </div>

          <ImageGallery images={product?.images} />

          <div className="mt-8 lg:col-span-5">
            <form>
              <AddToCart
                colors={product?.colors}
                sizes={product?.sizes}
                productId={params?.id}
                images={product?.images}
                price={product?.price}
                name={product?.name}
              />
            </form>

            <ProductDetails description={product?.description} />
            <Materials materials={product?.details} />
          </div>
        </div>

        <Suspense fallback={<Loader text="Loding Comments..." />}>
          <Reviews productId={product?._id as string} />
        </Suspense>

        <RelatedProducts />
      </main>
    </div>
  );
}
