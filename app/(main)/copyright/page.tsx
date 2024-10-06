/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Copyright, FileText, ShieldCheck } from 'lucide-react';
import { FaTrademark } from 'react-icons/fa';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export const metadata: Metadata = {
  title: 'Copyright Information | Luxe Attire',
  description:
    "Learn about Luxe Attire's copyright policies, trademarks, and usage guidelines for our content and materials.",
  openGraph: {
    title: 'Copyright Information | Luxe Attire',
    description:
      "Learn about Luxe Attire's copyright policies, trademarks, and usage guidelines for our content and materials.",
    type: 'website',
    url: 'https://luxeattire.com/copyright',
    images: [
      {
        url: 'https://luxeattire.com/og-image-copyright.jpg',
        width: 1200,
        height: 630,
        alt: 'Luxe Attire Copyright Information',
      },
    ],
  },
};

export default function CopyrightPage() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary py-16 px-4 sm:px-6 lg:px-8 border-t">
      <MaxWidthWrapper className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand">
            Copyright Information
          </h1>
          <p className="text-xl text-muted-foreground">
            Protecting our brand and respecting intellectual property
          </p>
        </div>

        {/* Copyright Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Copyright className="mr-2 text-brand" />
              Copyright Notice
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              © 2023 Luxe Attire, Inc. All rights reserved. The content, design,
              and images on this website are protected by copyright laws and may
              not be reproduced, distributed, transmitted, displayed, published,
              or broadcast without the prior written permission of Luxe Attire,
              Inc.
            </p>
            <p>
              Any unauthorized use of the materials appearing on this site may
              violate copyright, trademark, and other applicable laws and could
              result in criminal or civil penalties.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <FaTrademark className="mr-2 text-brand" />
              Trademarks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              The Luxe Attire name, logo, and all related product and service
              names, design marks, and slogans are trademarks or service marks
              of Luxe Attire, Inc. or its affiliates. All other product and
              service marks on this website are the trademarks of their
              respective owners.
            </p>
            <p>
              You are not permitted to use these marks without the prior written
              consent of Luxe Attire, Inc. or such third party that may own the
              marks.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <FileText className="mr-2 text-brand" />
              Usage Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Personal Use</AccordionTrigger>
                <AccordionContent>
                  You may view, download, and print pages from the website for
                  your own personal, non-commercial use, subject to the
                  restrictions set out in these terms and conditions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Commercial Use</AccordionTrigger>
                <AccordionContent>
                  You must obtain permission from Luxe Attire, Inc. if you wish
                  to use any of the contents of this website for commercial
                  purposes.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Modification</AccordionTrigger>
                <AccordionContent>
                  You must not modify the paper or digital copies of any
                  materials you have printed off or downloaded in any way, and
                  you must not use any illustrations, photographs, video or
                  audio sequences, or any graphics separately from any
                  accompanying text.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Attribution</AccordionTrigger>
                <AccordionContent>
                  Our status (and that of any identified contributors) as the
                  authors of content on our site must always be acknowledged.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <ShieldCheck className="mr-2 text-brand" />
              Reporting Infringement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              If you believe that any content on this website infringes upon
              your copyright or other intellectual property rights, please
              contact our copyright agent with the following information:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                A description of the copyrighted work or other intellectual
                property that you claim has been infringed.
              </li>
              <li>
                A description of where the material that you claim is infringing
                is located on the site.
              </li>
              <li>Your address, telephone number, and email address.</li>
              <li>
                A statement by you that you have a good faith belief that the
                disputed use is not authorized by the copyright owner, its
                agent, or the law.
              </li>
              <li>
                A statement by you, made under penalty of perjury, that the
                above information in your notice is accurate and that you are
                the copyright or intellectual property owner or authorized to
                act on the copyright or intellectual property owner's behalf.
              </li>
            </ul>
            <p className="mt-4">
              Our copyright agent can be reached at: copyright@luxeattire.com
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
            name: 'Copyright Information | Luxe Attire',
            description:
              'Luxe Attire copyright policies, trademarks, and usage guidelines for content and materials.',
            url: 'https://luxeattire.com/copyright',
          }),
        }}
      />
    </section>
  );
}
