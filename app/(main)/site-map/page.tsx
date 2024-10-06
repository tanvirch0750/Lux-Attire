/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Home,
  ShoppingBag,
  Info,
  FileText,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Site Map | Luxe Attire',
  description:
    "Navigate through Luxe Attire's website with ease. Find links to all our pages including product categories, customer service, and company information.",
  openGraph: {
    title: 'Site Map | Luxe Attire',
    description:
      "Navigate through Luxe Attire's website with ease. Find links to all our pages including product categories, customer service, and company information.",
    type: 'website',
    url: 'https://luxeattire.com/sitemap',
    images: [
      {
        url: 'https://luxeattire.com/og-image-sitemap.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxe Attire Site Map',
      },
    ],
  },
};

export default function SiteMapPage() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Site Map
          </h1>
          <p className="text-xl text-muted-foreground">
            Explore all pages of Luxe Attire
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Home className="mr-2" />
                Main Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-primary hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-primary hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-primary hover:underline"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-primary hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <ShoppingBag className="mr-2" />
                Shop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/shop" className="text-primary hover:underline">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/women"
                    className="text-primary hover:underline"
                  >
                    Women's Collection
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/men"
                    className="text-primary hover:underline"
                  >
                    Men's Collection
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/accessories"
                    className="text-primary hover:underline"
                  >
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop/sale"
                    className="text-primary hover:underline"
                  >
                    Sale Items
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Info className="mr-2" />
                Customer Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-primary hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shipping-delivery"
                    className="text-primary hover:underline"
                  >
                    Shipping & Delivery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/return-exchange"
                    className="text-primary hover:underline"
                  >
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link
                    href="/size-guide"
                    className="text-primary hover:underline"
                  >
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/care-instructions"
                    className="text-primary hover:underline"
                  >
                    Care Instructions
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <FileText className="mr-2" />
                Policies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms-conditions"
                    className="text-primary hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookie-policy"
                    className="text-primary hover:underline"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <ShieldCheck className="mr-2" />
                Account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link href="/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-primary hover:underline"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account"
                    className="text-primary hover:underline"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="text-primary hover:underline">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wishlist"
                    className="text-primary hover:underline"
                  >
                    Wishlist
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <HelpCircle className="mr-2" />
                Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-primary hover:underline"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-primary hover:underline"
                  >
                    Support Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/track-order"
                    className="text-primary hover:underline"
                  >
                    Track Your Order
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Site Map | Luxe Attire',
            description:
              "Navigate through Luxe Attire's website with ease. Find links to all our pages including product categories, customer service, and company information.",
            url: 'https://luxeattire.com/sitemap',
          }),
        }}
      />
    </section>
  );
}
