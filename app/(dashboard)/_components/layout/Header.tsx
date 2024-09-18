import { cn } from '@/lib/utils';

import { UserNav } from './UserNav';
import { MobileSidebar } from './MobileSidebar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky inset-x-0 top-0 w-full border-b py-2">
      <nav className="flex items-center justify-between px-4 py-2 md:justify-between">
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>
        <Link href="/">
          <Button className=" bg-brand hover:bg-brand/90" size="sm">
            Main Website
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </header>
  );
}
