import { Metadata } from 'next';
import { Suspense } from 'react';
import HeaderFilter from '../../_components/product-list/HeaderFilter';
import SideFilter from '../../_components/product-list/SideFilter';
import Loader from '@/components/Loader';
import CategoryproductList from '../../_components/product-list/CategoryProductList';

interface SearchParams {
  search?: string;
  sort?: string | 'price-asc' | 'price-desc';
  color?: string;
  price?: string;
  page?: string | number;
  limit?: string | number;
}

export interface IFilters {
  search: string;
  sort: string;
  categories?: string | string[] | undefined;
  colors: string[] | string | undefined;
  priceRanges: string | string[] | undefined;
  page?: string | number | undefined;
  limit?: string | number | undefined;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

  return {
    title: `${category} Products | Luxe Attire`,
    description: `Explore our collection of ${category.toLowerCase()} products. Find the perfect ${category.toLowerCase()} items to elevate your style at Luxe Attire.`,
    openGraph: {
      title: `${category} Products | Luxe Attire`,
      description: `Explore our collection of ${category.toLowerCase()} products. Find the perfect ${category.toLowerCase()} items to elevate your style at Luxe Attire.`,
      type: 'website',
      url: `https://luxe-attire.vercel.app/products/${params.category}`,
      images: [
        {
          url: `https://i.ibb.co.com/KN7fQCs/luxe-attire-og.png`,
          width: 1200,
          height: 630,
          alt: `${category} Products at Luxe Attire`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category} Products | Luxe Attire`,
      description: `Explore our collection of ${category.toLowerCase()} products. Find the perfect ${category.toLowerCase()} items to elevate your style at Luxe Attire.`,
      images: [`https://i.ibb.co.com/KN7fQCs/luxe-attire-og.png`],
    },
  };
}

export default async function ProductCategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: SearchParams;
}) {
  const { search, sort, color, price, page, limit } = searchParams;
  const category = params?.category;

  // Prepare filter conditions based on the extracted searchParams
  const filters: IFilters = {
    search: search || '',
    sort: sort || 'price-asc',
    colors: color,
    priceRanges: price,
    page: page || 1,
    limit: 12,
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

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: `${categoryName} Products - Luxe Attire`,
            description: `Explore our collection of ${category.toLowerCase()} products. Find the perfect ${category.toLowerCase()} items to elevate your style at Luxe Attire.`,
            url: `https://luxe-attire.vercel.app/products/${category}`,
            isPartOf: {
              '@type': 'WebSite',
              name: 'Luxe Attire',
              url: 'https://www.luxeattire.com',
            },
          }),
        }}
      />

      <main>
        <h1 className="sr-only">{categoryName} Products - Luxe Attire</h1>

        <section
          aria-label={`${categoryName} Products and Filters`}
          className="space-y-6 dark:bg-transparent p-[24px] border-t"
        >
          <HeaderFilter filters={filters} />

          <div className="pb-24 pt-0">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <aside>
                <h2 className="sr-only">Product Filters</h2>
                <SideFilter isCategory={false} />
              </aside>

              <div className="lg:col-span-4">
                <h2 className="sr-only">Product List</h2>
                <Suspense
                  fallback={
                    <Loader text="Loading Products" className="lg:col-span-4" />
                  }
                  key={filters?.search || filters.sort}
                >
                  <CategoryproductList
                    filters={filters}
                    categoryValue={category}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
