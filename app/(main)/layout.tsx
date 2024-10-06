import { SessionProvider } from 'next-auth/react';
import Footer from '@/components/Footer';
import MiniHeader from '@/components/MiniHeader';
import MainNavWrapper from '@/components/MainNavWrapper';

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
            <MainNavWrapper />
          </SessionProvider>
        </div>
      </div>

      <main className="flex-1 flex flex-col">{children}</main>

      <Footer />
    </div>
  );
};
export default MainLayout;
