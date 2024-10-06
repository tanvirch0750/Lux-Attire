import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export const metadata: Metadata = {
  title: 'About Luxe Attire | Where Elegance Meets Affordability',
  description:
    'Discover the story behind Luxe Attire, our mission to provide timeless fashion, and why customers choose us for elegant, affordable clothing.',
  openGraph: {
    title: 'About Luxe Attire | Where Elegance Meets Affordability',
    description:
      'Discover the story behind Luxe Attire, our mission to provide timeless fashion, and why customers choose us for elegant, affordable clothing.',
    type: 'website',
    url: 'https://luxeattire.com/about',
    images: [
      {
        url: 'https://luxeattire.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxe Attire - Elegant and Affordable Fashion',
      },
    ],
  },
};

export default function AboutUsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-background to-secondary border-t py-16 px-4 sm:px-6 lg:px-8">
        <MaxWidthWrapper className=" mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold  mb-4 text-brand">
              About Luxe Attire
            </h1>
            <p className="text-xl text-muted-foreground">
              Where Elegance Meets Affordability
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  At Luxe Attire, our mission is to offer timeless,
                  sophisticated fashion that elevates your wardrobe while
                  ensuring affordability. We believe that luxury should not come
                  with a heavy price tag, and our collection reflects this
                  belief. Our team works tirelessly to curate pieces that
                  combine style, grace, and comfort for every occasion.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a world where everyone can access elegant,
                  high-quality clothing without compromising on cost. Luxe
                  Attire strives to become a global fashion leader by offering
                  products that are stylish, eco-conscious, and designed to
                  last. We aim to empower individuals through fashion, inspiring
                  confidence and timeless elegance.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Why Choose Us */}
          <Card className="mb-16 p-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-12">
                Why Choose Luxe Attire?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid sm:grid-cols-2 gap-8">
                {[
                  {
                    title: 'Guaranteed Savings',
                    description:
                      "Save more than you spend! If your membership fee doesn't cover your savings, we'll refund the difference.",
                    icon: 'https://cdn-icons-png.freepik.com/256/2127/2127117.png',
                  },
                  {
                    title: 'Risk-Free Trial',
                    description:
                      'Experience all the benefits without worry. Not satisfied? Get your full membership fee back, no questions asked.',
                    icon: 'https://cdn-icons-png.freepik.com/256/10645/10645904.png',
                  },
                  {
                    title: 'Fast Delivery',
                    description:
                      'Get your products delivered in record time with our reliable and speedy delivery service.',
                    icon: 'https://cdn-icons-png.freepik.com/256/13606/13606863.png',
                  },
                  {
                    title: '1000+ Products',
                    description:
                      'Access a wide variety of premium products priced at cost, maximizing your savings.',
                    icon: 'https://cdn-icons-png.freepik.com/256/11744/11744509.png',
                  },
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-4">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                    <div>
                      <h3 className="font-semibold text-primary">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Join the Luxe Attire Family
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Become a part of the Luxe Attire experience and start shopping for
              timeless elegance.
            </p>
            <Button asChild size="lg" className=" bg-brand hover:bg-brand/90">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Luxe Attire',
            url: 'https://luxeattire.com',
            logo: 'https://luxeattire.com/logo.png',
            description:
              'Luxe Attire offers timeless, sophisticated fashion that elevates your wardrobe while ensuring affordability.',
            sameAs: [
              'https://www.facebook.com/luxeattire',
              'https://www.instagram.com/luxeattire',
              'https://twitter.com/luxeattire',
            ],
          }),
        }}
      />
    </>
  );
}
