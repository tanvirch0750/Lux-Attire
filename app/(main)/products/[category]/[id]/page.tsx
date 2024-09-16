import { ColorPicker } from '@/app/(main)/_components/product/ColorPicker';
import { ImageGallery } from '@/app/(main)/_components/product/ImageGallery';
import { Materials } from '@/app/(main)/_components/product/Materials';
import { Policies } from '@/app/(main)/_components/product/Policies';
import { ProductDetailReviews } from '@/app/(main)/_components/product/ProductDetailReviews';
import { ProductDetails } from '@/app/(main)/_components/product/ProductDetails';
import { ProductHeading } from '@/app/(main)/_components/product/ProductHeading';
import { RelatedProducts } from '@/app/(main)/_components/product/RelatedProducts';
import { Reviews } from '@/app/(main)/_components/product/Reviews';
import { SizePicker } from '@/app/(main)/_components/product/SizePicker';

export default async function Example({ params }: { params: { id: string } }) {
  return (
    <div className="bg-white border-t">
      <main className="mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-2">
        <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <ProductHeading />
            <ProductDetailReviews />
          </div>

          <ImageGallery />

          <div className="mt-8 lg:col-span-5">
            <form>
              <ColorPicker />

              <SizePicker />

              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-brand px-8 py-3 text-base font-medium text-white hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </form>

            <ProductDetails />
            <Materials />
            <Policies />
          </div>
        </div>

        <Reviews />
        <RelatedProducts />
      </main>
    </div>
  );
}
