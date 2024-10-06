/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Truck,
  Clock,
  Globe,
  MapPin,
  Package,
  AlertTriangle,
} from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export const metadata: Metadata = {
  title: 'Shipping & Delivery | Luxe Attire',
  description:
    "Learn about Luxe Attire's shipping options, delivery times, and policies. Find information on domestic and international shipping, tracking your order, and more.",
  openGraph: {
    title: 'Shipping & Delivery | Luxe Attire',
    description:
      "Learn about Luxe Attire's shipping options, delivery times, and policies. Find information on domestic and international shipping, tracking your order, and more.",
    type: 'website',
    url: 'https://luxeattire.com/shipping-delivery',
    images: [
      {
        url: 'https://luxeattire.com/og-image-shipping.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxe Attire Shipping & Delivery Information',
      },
    ],
  },
};

export default function ShippingDeliveryPage() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary py-16 px-4 sm:px-6 lg:px-8 border-t">
      <MaxWidthWrapper className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand">
            Shipping & Delivery
          </h1>
          <p className="text-xl text-muted-foreground">
            Fast, reliable shipping to your doorstep
          </p>
        </div>

        {/* Shipping Options */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Truck className="mr-2 text-brand" />
              Shipping Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Shipping Method</TableHead>
                  <TableHead>Estimated Delivery Time</TableHead>
                  <TableHead>Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Standard Shipping</TableCell>
                  <TableCell>3-5 business days</TableCell>
                  <TableCell>$5.99</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Express Shipping</TableCell>
                  <TableCell>1-2 business days</TableCell>
                  <TableCell>$14.99</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Next Day Delivery</TableCell>
                  <TableCell>Next business day</TableCell>
                  <TableCell>$24.99</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>International Shipping</TableCell>
                  <TableCell>7-14 business days</TableCell>
                  <TableCell>Varies by location</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Free Shipping Promotion */}
        <Alert className="mb-8">
          <Package className="h-4 w-4 text-brand" />
          <AlertTitle>Free Shipping on Orders Over $100</AlertTitle>
          <AlertDescription>
            Enjoy free standard shipping on all domestic orders over $100.
            International orders over $200 qualify for free express shipping.
          </AlertDescription>
        </Alert>

        {/* Delivery Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Clock className="mr-2 text-brand" />
              Delivery Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Order Processing Time</AccordionTrigger>
                <AccordionContent>
                  Orders are typically processed within 1-2 business days.
                  During peak seasons or promotional periods, processing may
                  take up to 3 business days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Delivery Days</AccordionTrigger>
                <AccordionContent>
                  We deliver Monday through Friday, excluding major holidays.
                  Next Day and Express deliveries are not available on weekends
                  or holidays.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Signature Required</AccordionTrigger>
                <AccordionContent>
                  For orders over $200, a signature may be required upon
                  delivery to ensure the safety of your package.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* International Shipping */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Globe className="mr-2 text-brand" />
              International Shipping
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              We ship to over 100 countries worldwide. International shipping
              rates and delivery times vary depending on the destination and
              chosen shipping method.
            </p>
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important Note for International Orders</AlertTitle>
              <AlertDescription>
                Customers are responsible for all duties, import taxes, and
                customs fees. These are not included in the shipping cost and
                will be collected upon delivery.
              </AlertDescription>
            </Alert>
            <p>
              For specific international shipping rates and delivery estimates,
              please proceed to checkout and enter your shipping address.
            </p>
          </CardContent>
        </Card>

        {/* Order Tracking */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <MapPin className="mr-2 text-brand" />
              Order Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Once your order ships, you will receive a shipping confirmation
              email with a tracking number. You can use this number to track
              your package's progress.
            </p>
            <p>
              To track your order, visit our{' '}
              <a
                href="/order-tracking"
                className="text-primary hover:underline"
              >
                Order Tracking page
              </a>{' '}
              or log in to your account to view real-time updates on your
              shipment.
            </p>
          </CardContent>
        </Card>

        {/* Shipping FAQs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Package className="mr-2 text-brand" />
              Shipping FAQs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Can I change my shipping address after placing an order?
                </AccordionTrigger>
                <AccordionContent>
                  If your order hasn't been processed yet, you may be able to
                  change the shipping address. Please contact our customer
                  support team immediately with your order number and the new
                  shipping address.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What should I do if my package is lost or damaged?
                </AccordionTrigger>
                <AccordionContent>
                  If your package is lost or arrives damaged, please contact our
                  customer support team within 48 hours of the expected delivery
                  date. We'll work with the shipping carrier to resolve the
                  issue and ensure you receive your order.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Do you offer expedited shipping for international orders?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, we offer expedited shipping options for many
                  international destinations. The availability and cost of
                  expedited shipping will be displayed during checkout based on
                  your location.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </MaxWidthWrapper>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Shipping & Delivery | Luxe Attire',
            description:
              "Information about Luxe Attire's shipping options, delivery times, and policies for domestic and international orders.",
            url: 'https://luxeattire.com/shipping-delivery',
          }),
        }}
      />
    </section>
  );
}
