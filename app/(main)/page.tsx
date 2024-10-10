import { Metadata } from 'next';
import CategoryGrid from './_components/Categories';
import { Hero } from './_components/Hero';
import Img from '@/assests/hero-two.jpg';
import NewArrivals from './_components/NewArrivals';
import SpecialOffer from './_components/special-offers/SpecialOffer';
import NewsLetter from './_components/NewsLetter';
import ProductsShowcase from './_components/ProductShowcase';
import WhyChooseUs from './_components/WhyChooseUs';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
import MensCollectionBanner from './_components/MensCollectionBanner';
import OfferAndFreeShippingBanner from './_components/OfferCard';

export const metadata: Metadata = {
  title: 'Luxe Attire | Timeless Elegance in Fashion',
  description:
    'Discover a curated collection of sophisticated fashion at Luxe Attire. Luxurious garments crafted for those who appreciate style with grace. Elevate your wardrobe today.',
  openGraph: {
    title: 'Luxe Attire | Timeless Elegance in Fashion',
    description:
      'Discover a curated collection of sophisticated fashion at Luxe Attire. Luxurious garments crafted for those who appreciate style with grace. Elevate your wardrobe today.',
    images: [
      {
        url: 'https://i.ibb.co.com/KN7fQCs/luxe-attire-og.png',
        width: 1200,
        height: 630,
        alt: 'Luxe Attire - Timeless Elegance in Fashion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxe Attire | Timeless Elegance in Fashion',
    description:
      'Discover a curated collection of sophisticated fashion at Luxe Attire. Luxurious garments crafted for those who appreciate style with grace. Elevate your wardrobe today.',
    images: ['https://i.ibb.co.com/KN7fQCs/luxe-attire-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
  },
};

export default function HomePage() {
  const data = {
    background_image: Img,
    title: 'Unveil Timeless Elegance',
    description:
      'Discover a curated collection of sophisticated fashion that transcends trends. At Luxe Attire, we bring you luxurious garments crafted for those who appreciate style with grace.',
    link_title: 'Shop At Luxe Attire',
    link_url: '/products',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ClothingStore',
            name: 'Luxe Attire',
            description:
              'Discover a curated collection of sophisticated fashion at Luxe Attire. Luxurious garments crafted for those who appreciate style with grace.',
            url: 'https://luxe-attire.vercel.app/',
            logo: 'https://i.ibb.co.com/3NKsYxH/luxe-attire-logo.png',
            sameAs: [
              'https://www.facebook.com/luxeattire',
              'https://www.instagram.com/luxeattire',
              'https://twitter.com/luxeattire',
            ],
          }),
        }}
      />

      <main>
        <h1 className="sr-only">Luxe Attire - Timeless Elegance in Fashion</h1>

        <Hero data={data} />

        <section aria-label="Product Categories">
          <h2 className="sr-only">Product Categories</h2>
          <CategoryGrid />
        </section>

        <section aria-label="New Arrivals">
          <h2 className="sr-only">New Arrivals</h2>
          <Suspense fallback={<Loader text="Loading New Arrivals Products" />}>
            <NewArrivals />
          </Suspense>
        </section>

        <section
          aria-label="Discount and free shipping"
          className=" py-8 md:py-12"
        >
          <h2 className="sr-only">Discount and free shipping</h2>
          <OfferAndFreeShippingBanner />
        </section>

        <section aria-label="Why Choose Us">
          <h2 className="sr-only">Why Choose Us</h2>
          <WhyChooseUs />
        </section>

        <section aria-label="Featured Products">
          <h2 className="sr-only">Featured Products</h2>
          <ProductsShowcase />
        </section>

        <section aria-label="Special Offers" className="hidden md:block pb-12">
          <h2 className="sr-only">Special Offers</h2>
          <SpecialOffer />
        </section>

        <section aria-label="Men's Collection">
          <h2 className="sr-only">Men's Collection</h2>
          <MensCollectionBanner />
        </section>

        <section aria-label="Newsletter Signup" className="mb-20">
          <h2 className="sr-only">Newsletter Signup</h2>
          <NewsLetter />
        </section>
      </main>
    </>
  );
}
