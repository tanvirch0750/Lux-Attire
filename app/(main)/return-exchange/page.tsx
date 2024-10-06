/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Clock,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export const metadata: Metadata = {
  title: 'Return & Exchange Policy | Luxe Attire',
  description:
    "Learn about Luxe Attire's return and exchange policy. Find information on how to return or exchange items, eligibility criteria, and processing times.",
  openGraph: {
    title: 'Return & Exchange Policy | Luxe Attire',
    description:
      "Learn about Luxe Attire's return and exchange policy. Find information on how to return or exchange items, eligibility criteria, and processing times.",
    type: 'website',
    url: 'https://luxeattire.com/return-exchange',
    images: [
      {
        url: 'https://luxeattire.com/og-image-return-exchange.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxe Attire Return & Exchange Policy',
      },
    ],
  },
};

export default function ReturnExchangePage() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary py-16 px-4 sm:px-6 lg:px-8 border-t">
      <MaxWidthWrapper className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand">
            Return & Exchange Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Easy returns and exchanges for your peace of mind
          </p>
        </div>

        {/* Policy Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <RotateCcw className="mr-2 text-brand" />
              Policy Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              At Luxe Attire, we want you to be completely satisfied with your
              purchase. If you're not happy with your order, we offer a simple
              return and exchange process.
            </p>
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertTitle>30-Day Return Window</AlertTitle>
              <AlertDescription>
                You have 30 days from the date of delivery to return or exchange
                your item(s).
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Eligibility */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <CheckCircle className="mr-2 text-brand" />
              Return & Exchange Eligibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              To be eligible for a return or exchange, your item must be:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>
                Unworn, unwashed, and in the same condition that you received it
              </li>
              <li>In the original packaging</li>
              <li>Accompanied by the receipt or proof of purchase</li>
            </ul>
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Non-Returnable Items</AlertTitle>
              <AlertDescription>
                For hygiene reasons, we cannot accept returns on intimates,
                swimwear, or final sale items unless they are defective.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Return Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <RotateCcw className="mr-2 text-brand" />
              Return Process
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-4">
              <li>
                <strong>Initiate your return:</strong> Log into your account and
                select the item(s) you wish to return. If you checked out as a
                guest, use our{' '}
                <a
                  href="/guest-returns"
                  className="text-primary hover:underline"
                >
                  guest return portal
                </a>
                .
              </li>
              <li>
                <strong>Print your return label:</strong> Once your return is
                approved, we'll email you a prepaid return shipping label.
              </li>
              <li>
                <strong>Pack your return:</strong> Place the item(s) in their
                original packaging along with all tags and the original receipt.
              </li>
              <li>
                <strong>Ship your return:</strong> Affix the prepaid label to
                your package and drop it off at any authorized shipping
                location.
              </li>
            </ol>
          </CardContent>
        </Card>

        {/* Refunds and Exchanges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <HelpCircle className="mr-2 text-brand" />
              Refunds and Exchanges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Refund Process</AccordionTrigger>
                <AccordionContent>
                  <p>
                    Once we receive your return, we'll inspect the item and
                    process your refund. The money will be refunded to your
                    original payment method.
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    <li>
                      Credit card refunds typically take 5-10 business days to
                      appear on your statement.
                    </li>
                    <li>
                      For payment methods like PayPal or Apple Pay, refunds are
                      usually processed within 3-5 business days.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Exchange Process</AccordionTrigger>
                <AccordionContent>
                  <p>To exchange an item:</p>
                  <ol className="list-decimal list-inside mt-2">
                    <li>Initiate a return as described above.</li>
                    <li>
                      Once your return is processed, we'll email you a one-time
                      use coupon for the value of your returned item.
                    </li>
                    <li>Use this coupon to purchase the new item you want.</li>
                  </ol>
                  <p className="mt-2">
                    This process ensures you get exactly what you want while
                    allowing us to manage our inventory efficiently.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Us */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              If you have any questions about our return and exchange policy,
              please don't hesitate to contact us.
            </p>
            <Button className=" bg-brand bg-brand/90">
              Contact Customer Support
            </Button>
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
            name: 'Return & Exchange Policy | Luxe Attire',
            description:
              "Information about Luxe Attire's return and exchange policy, including eligibility criteria and process details.",
            url: 'https://luxeattire.com/return-exchange',
          }),
        }}
      />
    </section>
  );
}
