import { cn } from '@/lib/utils';

import { UserNav } from './UserNav';
import { MobileSidebar } from './MobileSidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getUserByEmail } from '@/db/actions-and-queries/user/user-query';

export default async function Header({ userEmail }: { userEmail: string }) {
  const user = await getUserByEmail(userEmail as string);

  return (
    <header className="sticky inset-x-0 top-0 w-full border-b py-2 z-50 bg-white md:bg-transparent">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-between">
        <div className={cn('block md:!hidden')}>
          <MobileSidebar />
        </div>
        <Link href="/">
          <Button className=" bg-brand hover:bg-brand/90" size="sm">
            Main Website
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <UserNav user={user} />
        </div>
      </nav>
    </header>
  );
}
