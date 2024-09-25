import type { Metadata } from 'next';
import Header from './_components/layout/Header';
import Providers from './_components/layout/Providers';
import { auth } from '@/auth';
import Sidebar from './_components/layout/Sidebar.';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="flex">
      <Providers session={session}>
        <Sidebar />
        <main className="w-full flex-1 overflow-hidden bg-primary-foreground h-screen">
          <Header />
          {children}
        </main>
      </Providers>
    </div>
  );
}
