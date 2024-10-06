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
import {
  FileText,
  ShieldCheck,
  CreditCard,
  Scale,
  AlertTriangle,
  Mail,
} from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Luxe Attire',
  description:
    "Read Luxe Attire's Terms and Conditions. Understand your rights and responsibilities when using our website and services.",
  openGraph: {
    title: 'Terms and Conditions | Luxe Attire',
    description:
      "Read Luxe Attire's Terms and Conditions. Understand your rights and responsibilities when using our website and services.",
    type: 'website',
    url: 'https://luxeattire.com/terms-conditions',
    images: [
      {
        url: 'https://luxeattire.com/og-image-terms-conditions.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxe Attire Terms and Conditions',
      },
    ],
  },
};

export default function TermsConditionsPage() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary py-16 px-4 sm:px-6 lg:px-8 border-t">
      <MaxWidthWrapper className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand">
            Terms and Conditions
          </h1>
          <p className="text-xl text-muted-foreground">
            Please read these terms carefully before using our services
          </p>
        </div>

        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4 text-brand" />
          <AlertTitle>Last Updated</AlertTitle>
          <AlertDescription>
            These Terms and Conditions were last updated on October 6, 2023.
          </AlertDescription>
        </Alert>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <FileText className="mr-2 text-brand" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Welcome to Luxe Attire. These Terms and Conditions govern your use
              of our website and the purchase of products from our online store.
              By accessing our website or placing an order, you agree to be
              bound by these Terms and Conditions.
            </p>
            <p className="mt-4">
              If you do not agree to all the terms and conditions of this
              agreement, you may not access the website or use any services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <ShieldCheck className="mr-2 text-brand" />
              Use of Website
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>License to Use Website</AccordionTrigger>
                <AccordionContent>
                  <p>
                    We grant you a limited, non-exclusive, non-transferable
                    license to access and use our website for personal,
                    non-commercial purposes. This license does not include any
                    resale or commercial use of our website or its contents.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Prohibited Uses</AccordionTrigger>
                <AccordionContent>
                  <p>You may not use our website:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>For any unlawful purpose</li>
                    <li>
                      To solicit others to perform or participate in any
                      unlawful acts
                    </li>
                    <li>
                      To violate any international, federal, provincial or state
                      regulations, rules, laws, or local ordinances
                    </li>
                    <li>
                      To infringe upon or violate our intellectual property
                      rights or the intellectual property rights of others
                    </li>
                    <li>
                      To harass, abuse, insult, harm, defame, slander,
                      disparage, intimidate, or discriminate
                    </li>
                    <li>To submit false or misleading information</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <CreditCard className="mr-2 text-brand" />
              Products and Purchases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Product Information</AccordionTrigger>
                <AccordionContent>
                  <p>
                    We strive to display our products and their colors as
                    accurately as possible. However, we cannot guarantee that
                    your computer or mobile device's display of any color will
                    be accurate.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Pricing and Availability</AccordionTrigger>
                <AccordionContent>
                  <p>
                    All prices are subject to change without notice. We reserve
                    the right to modify or discontinue any product without
                    notice. We shall not be liable to you or any third party for
                    any modification, price change, suspension, or
                    discontinuance of the product.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Payment Terms</AccordionTrigger>
                <AccordionContent>
                  <p>
                    We accept various forms of payment, including credit cards
                    and PayPal. By submitting an order, you represent and
                    warrant that you have the legal right to use any payment
                    method(s) you select.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Scale className="mr-2 text-brand" />
              Limitation of Liability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              In no event shall Luxe Attire, nor its directors, employees,
              partners, agents, suppliers, or affiliates, be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including without limitation, loss of profits, data, use,
              goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>
                Your access to or use of or inability to access or use the
                website
              </li>
              <li>Any conduct or content of any third party on the website</li>
              <li>Any content obtained from the website</li>
              <li>
                Unauthorized access, use or alteration of your transmissions or
                content
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <AlertTriangle className="mr-2 text-brand" />
              Changes to Terms
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material we will try to
              provide at least 30 days' notice prior to any new terms taking
              effect.
            </p>
            <p className="mt-4">
              By continuing to access or use our website after those revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, please stop using the website.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Mail className="mr-2 text-brand" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> legal@luxeattire.com
              <br />
              <strong>Address:</strong> 123 Fashion Avenue, Style City, ST
              12345, United States
            </p>
          </CardContent>
        </Card>
      </MaxWidthWrapper>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Terms and Conditions | Luxe Attire',
            description:
              "Luxe Attire's Terms and Conditions explaining the rules and guidelines for using our website and services.",
            url: 'https://luxeattire.com/terms-conditions',
          }),
        }}
      />
    </section>
  );
}
