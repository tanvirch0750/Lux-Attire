import { Josefin_Sans } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
// import { Toaster } from '@/components/ui/sonner';
import { dbConnect } from '@/db/service/mongo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const josefin = Josefin_Sans({ subsets: ['latin'] });

export const metadata = {
  title: 'Clothing',
  description: 'Explore || Wear || buy || brand',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const conn = await dbConnect();
  return (
    <html lang="en" className=" h-full">
      <body className={cn(josefin.className)}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
