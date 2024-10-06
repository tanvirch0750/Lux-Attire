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
  Shield,
  Eye,
  Database,
  Globe,
  Mail,
  AlertTriangle,
} from 'lucide-react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export const metadata: Metadata = {
  title: 'Privacy Policy | Luxe Attire',
  description:
    'Learn about how Luxe Attire collects, uses, and protects your personal information. Our privacy policy explains your rights and our practices.',
  openGraph: {
    title: 'Privacy Policy | Luxe Attire',
    description:
      'Learn about how Luxe Attire collects, uses, and protects your personal information. Our privacy policy explains your rights and our practices.',
    type: 'website',
    url: 'https://luxeattire.com/privacy-policy',
    images: [
      {
        url: 'https://luxeattire.com/og-image-privacy-policy.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxe Attire Privacy Policy',
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary py-16 px-4 sm:px-6 lg:px-8 border-t">
      <MaxWidthWrapper className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Your privacy is important to us
          </p>
        </div>

        {/* Last Updated */}
        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4 text-brand" />
          <AlertTitle>Last Updated</AlertTitle>
          <AlertDescription>
            This privacy policy was last updated on June 1, 2023.
          </AlertDescription>
        </Alert>

        {/* Introduction */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Shield className="mr-2 text-brand" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Luxe Attire ("we", "our", or "us") is committed to protecting your
              privacy. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our
              website or make a purchase from us.
            </p>
            <p className="mt-4">
              By using our services, you agree to the collection and use of
              information in accordance with this policy. If you do not agree
              with our policies and practices, your choice is not to use our
              services.
            </p>
          </CardContent>
        </Card>

        {/* Information We Collect */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Eye className="mr-2 text-brand" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Personal Information</AccordionTrigger>
                <AccordionContent>
                  <p>
                    We may collect the following types of personal information:
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Postal address</li>
                    <li>Phone number</li>
                    <li>
                      Payment information (credit card numbers, billing address)
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Non-Personal Information</AccordionTrigger>
                <AccordionContent>
                  <p>
                    We may also collect non-personal information, including:
                  </p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Browser type</li>
                    <li>IP address</li>
                    <li>Operating system</li>
                    <li>Referring URLs</li>
                    <li>Clickstream data</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* How We Use Your Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Database className="mr-2 text-brand" />
              How We Use Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Process your orders and provide customer service</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Detect and prevent fraud</li>
            </ul>
          </CardContent>
        </Card>

        {/* Sharing Your Information */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Globe className="mr-2 text-brand" />
              Sharing Your Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>We may share your information with:</p>
            <ul className="list-disc list-inside mt-2 mb-4">
              <li>
                Service providers (e.g., payment processors, shipping companies)
              </li>
              <li>Affiliates and business partners</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                We do not sell your personal information to third parties.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Your Rights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Shield className="mr-2 text-brand" />
              Your Rights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Access and receive a copy of your personal data</li>
              <li>Rectify inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to the processing of your personal data</li>
              <li>
                Withdraw consent at any time (where processing is based on
                consent)
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Us */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Mail className="mr-2 text-brand" />
              Contact Us
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@luxeattire.com
              <br />
              <strong>Address:</strong> 123 Fashion Avenue, Style City, ST
              12345, United States
            </p>
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
            name: 'Privacy Policy | Luxe Attire',
            description:
              "Luxe Attire's privacy policy explaining how we collect, use, and protect your personal information.",
            url: 'https://luxeattire.com/privacy-policy',
          }),
        }}
      />
    </section>
  );
}
