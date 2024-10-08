import { Metadata } from 'next';
import HeaderFilter from '../_components/product-list/HeaderFilter';
import SideFilter from '../_components/product-list/SideFilter';
import ProductList from '../_components/product-list/ProductList';
import { Suspense } from 'react';
import Loader from '@/components/Loader';

export const metadata: Metadata = {
  title: 'All Products | Luxe Attire',
  description:
    'Explore our wide range of luxurious and elegant clothing. Find the perfect piece to elevate your wardrobe at Luxe Attire.',
  openGraph: {
    title: 'All Products | Luxe Attire',
    description:
      'Explore our wide range of luxurious and elegant clothing. Find the perfect piece to elevate your wardrobe at Luxe Attire.',
    type: 'website',
    url: 'https://luxe-attire.vercel.app/products',
    images: [
      {
        url: 'https://i.ibb.co.com/KN7fQCs/luxe-attire-og.png',
        width: 1200,
        height: 630,
        alt: 'Luxe Attire Product Collection',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

// export const revalidate = 3600;

interface SearchParams {
  search?: string;
  sort?: string | 'price-asc' | 'price-desc';
  color?: string;
  price?: string;
  category?: string;
  page?: number | string;
  limit?: number | string;
}

export interface IFilters {
  search: string;
  sort: string;
  categories?: string | string[] | undefined;
  colors: string[] | string | undefined;
  priceRanges: string | string[] | undefined;
  page?: number | string | undefined;
  limit?: number | string | undefined;
}

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { search, sort, color, price, category, page, limit } = searchParams;

  //Prepare filter conditions based on the extracted searchParams
  const filters: IFilters = {
    search: search || '',
    sort: sort || 'price-asc',
    colors: color,
    priceRanges: price,
    categories: category,
    page: page || 1,
    limit: limit || 12,
  };

  console.log('filters', filters);

  if (typeof filters.categories === 'string') {
    filters.categories = [filters.categories];
  }

  if (typeof filters.colors === 'string') {
    filters.colors = [filters.colors];
  }

  if (typeof filters.priceRanges === 'string') {
    filters.priceRanges = [filters.priceRanges];
  }

  // Create a unique key based on all filter values
  const filterKey = JSON.stringify(filters);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'All Products - Luxe Attire',
            description:
              'Explore our wide range of luxurious and elegant clothing. Find the perfect piece to elevate your wardrobe at Luxe Attire.',
            url: 'https://luxe-attire.vercel.app/products',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Luxe Attire',
              url: 'https://luxe-attire.vercel.app',
            },
          }),
        }}
      />

      <main>
        <h1 className="sr-only">All Products - Luxe Attire</h1>

        <section
          aria-label="Product Filters and List"
          className="space-y-6 dark:bg-transparent p-[24px] border-t"
        >
          <HeaderFilter filters={filters} />

          <div className="pb-24 pt-0">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <aside>
                <h2 className="sr-only">Product Filters</h2>
                <SideFilter />
              </aside>

              <div className="lg:col-span-4">
                <h2 className="sr-only">Product List</h2>
                <Suspense
                  fallback={
                    <Loader text="Loading Products" className="lg:col-span-4" />
                  }
                  key={filterKey}
                >
                  <ProductList filters={filters} />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductsPage;
