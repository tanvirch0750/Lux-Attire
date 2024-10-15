import type { Metadata } from 'next';
import Header from './_components/layout/Header';
import Providers from './_components/layout/Providers';
import { auth } from '@/auth';
import Sidebar from './_components/layout/Sidebar.';
import { getUserRoleByEmail } from '@/db/actions-and-queries/user/user-query';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Luxe Attire | Dashboard',
  description: 'Luxe attire, dashboard',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userRole = await getUserRoleByEmail(session?.user?.email as string);

  if (!session?.user) {
    redirect('/login');
  }

  if (userRole !== 'admin') {
    redirect('/unauthorized');
  }

  return (
    <div className="flex">
      <Providers session={session}>
        <Sidebar />
        <main className="w-full flex-1 md:overflow-y-hidden  bg-primary-foreground h-screen">
          <Header userEmail={session?.user?.email as string} />
          <div className=" ">{children}</div>
        </main>
      </Providers>
    </div>
  );
}
