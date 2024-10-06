/* eslint-disable react/no-unescaped-entities */
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  HelpCircle,
  Truck,
  RotateCcw,
  Phone,
  Package,
  UserCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Support Center | Luxe Attire',
  description:
    'Need help? Visit the Luxe Attire Support Center for FAQs, shipping information, returns, and contact support.',
};

export default function SupportCenterPage() {
  return (
    <section className="bg-gradient-to-b from-background to-secondary py-16 px-4 sm:px-6 lg:px-8 border-t">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand">
            Support Center
          </h1>
          <p className="text-xl text-muted-foreground">
            We're here to help with anything you need.
          </p>
        </div>

        {/* Support Options */}
        <Tabs defaultValue="faqs" className="mb-16">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="tracking">Order Tracking</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="faqs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      How long does shipping take?
                    </AccordionTrigger>
                    <AccordionContent>
                      Shipping typically takes 3-5 business days for domestic
                      orders and 7-14 business days for international orders.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      What is your return policy?
                    </AccordionTrigger>
                    <AccordionContent>
                      We offer a 30-day return policy for unworn items in their
                      original condition with tags attached.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>
                      How can I track my order?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can track your order by logging into your account or
                      using the tracking number provided in your shipping
                      confirmation email.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Shipping Method</TableHead>
                      <TableHead>Estimated Delivery</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Standard</TableCell>
                      <TableCell>3-5 business days</TableCell>
                      <TableCell>$5.99</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Express</TableCell>
                      <TableCell>1-2 business days</TableCell>
                      <TableCell>$14.99</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>International</TableCell>
                      <TableCell>7-14 business days</TableCell>
                      <TableCell>$19.99</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="returns">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <RotateCcw className="mr-2" />
                  Return Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  We offer a 30-day return policy for all unworn items in their
                  original condition with tags attached.
                </p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Initiate a return through your account or contact customer
                    support.
                  </li>
                  <li>Print the provided return label.</li>
                  <li>
                    Pack the item(s) securely with all original packaging and
                    tags.
                  </li>
                  <li>
                    Drop off the package at your nearest post office or schedule
                    a pickup.
                  </li>
                  <li>
                    Once received and inspected, we'll process your refund
                    within 5-7 business days.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder="Your Name" />
                  <Input type="email" placeholder="Your Email" />
                  <Input placeholder="Subject" />
                  <textarea
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Your Message"
                  ></textarea>
                  <Button type="submit">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tracking">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2" />
                  Order Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder="Enter your order number" />
                  <Button type="submit">Track Order</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCircle className="mr-2" />
                  Account Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-primary hover:underline">
                      Update your profile
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline">
                      Manage addresses
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline">
                      View order history
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-primary hover:underline">
                      Change password
                    </a>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Support CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Need Further Assistance?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our support team is here to help. If you can't find the answers
            you're looking for, feel free to reach out.
          </p>
          <Button size="lg" className=" bg-brand hover:bg-brand/90">
            Contact Support
          </Button>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Support Center | Luxe Attire',
            description:
              'Luxe Attire Support Center provides help for FAQs, shipping information, returns, and customer support.',
            url: 'https://luxeattire.com/support',
          }),
        }}
      />
    </section>
  );
}
