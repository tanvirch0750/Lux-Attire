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
    title: 'Brands',
    href: '/',
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
        <div className="container flex mx-auto  items-center justify-between px-2">
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
