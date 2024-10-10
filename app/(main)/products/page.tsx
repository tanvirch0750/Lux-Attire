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

  const filters: IFilters = {
    search: search || '',
    sort: sort || 'price-asc',
    colors: color,
    priceRanges: price,
    categories: category,
    page: page || 1,
    limit: limit || 12,
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

      <main className="relative border-t">
        <h1 className="sr-only">All Products - Luxe Attire</h1>

        <div className="sticky top-0 z-20 bg-white px-[24px] py-[18px]">
          <HeaderFilter filters={filters} />
        </div>

        <section
          aria-label="Product Filters and List"
          className="space-y-6 p-[24px] "
        >
          <div className="pb-24 pt-0">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <aside className="hidden lg:block">
                <div className="sticky top-[var(--header-height)] h-[calc(100vh-var(--header-height))] overflow-y-auto">
                  <h2 className="sr-only">Product Filters</h2>
                  <SideFilter />
                </div>
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
