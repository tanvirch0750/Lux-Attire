import Image from 'next/image';
// import { relatedProducts } from '../../products/[category]/[id]/data';
import { getRelatedProducts } from '@/db/actions-and-queries/products/products-queries';
import { TProduct } from '@/db/models/product-model';
import Link from 'next/link';

export async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts: TProduct[] = await getRelatedProducts(id);

  console.log('relted products', relatedProducts);

  return (
    <section aria-labelledby="related-heading" className="mt-16 sm:mt-12">
      <h2 id="related-heading" className="text-lg font-medium text-gray-900">
        Customers also purchased
      </h2>

      {relatedProducts?.length > 0 ? (
        <>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Image
                    src={
                      relatedProduct?.images.filter((image) => image.primary)[0]
                        .imageSrc
                    }
                    alt="Related product image"
                    width={700}
                    height={700}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link
                        href={`/products/${relatedProduct?.category?.value}/${relatedProduct._id}`}
                      >
                        <span aria-hidden="true" className="absolute inset-0" />
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {relatedProduct?.colors?.map((color, index) => (
                        <span key={color.bgColor}>
                          {color.name}
                          {index < relatedProduct.colors.length - 1
                            ? ', '
                            : ''}{' '}
                          {/* Add comma only if it's not the last color */}
                        </span>
                      ))}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {relatedProduct?.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="pt-8">No related products found </p>
      )}
    </section>
  );
}
