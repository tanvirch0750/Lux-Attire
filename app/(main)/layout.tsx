import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { SessionProvider } from 'next-auth/react';
import { MainNav } from '@/components/MainNav';
import Footer from '@/components/Footer';

const navLinks = [
  {
    title: 'All Products',
    href: '/products',
  },
  {
    title: "Womens's Wear",
    href: '/products/womens-wear',
  },
  {
    title: "Men's Wear",
    href: '/products/menswear',
  },
  {
    title: "Kids's Wear",
    href: '/products/kids-wear',
  },
  {
    title: 'Traditional',
    href: '/products/traditional-clothing',
  },
  {
    title: 'Accessories',
    href: '/products/accessories',
  },
];

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen flex-col ">
      <div className="h-20 py-4 z-50 bg-white/80 ">
        <div className="container flex mx-auto h-full  items-center justify-between px-2">
          <SessionProvider>
            <MainNav items={navLinks} />
          </SessionProvider>
        </div>
      </div>

      <main className="flex-1 flex flex-col">{children}</main>

      <Footer />
    </div>
  );
};
export default MainLayout;
