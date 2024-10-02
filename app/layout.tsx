import { Josefin_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
// import { Toaster } from '@/components/ui/sonner';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StoreProvider from './providers/StoreProvider';
import { dbConnect } from '@/db/service/mongo';

const josefin = Josefin_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Luxe Attire',
  description: 'Explore || Wear || buy || brand',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();

  return (
    <html lang="en" className=" h-full">
      <body className={cn(josefin.className)}>
        <StoreProvider>{children}</StoreProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
