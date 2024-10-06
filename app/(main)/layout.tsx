import { SessionProvider } from 'next-auth/react';
import { MainNav } from '@/components/MainNav';
import Footer from '@/components/Footer';
import MiniHeader from '@/components/MiniHeader';

const navLinks = [
  {
    title: 'All Products',
    href: '/products',
  },
  {
    title: "Womens's Wear",
    href: '/products/womens-collection',
  },
  {
    title: "Men's Wear",
    href: '/products/mens-collection',
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
      <MiniHeader />
      <div className="h-20 py-4 z-50 bg-white/60 ">
        <div className="px-6 flex mx-auto h-full  items-center justify-between">
          <SessionProvider>
            {/* @ts-ignore */}
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
