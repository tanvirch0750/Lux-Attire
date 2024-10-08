import Link from 'next/link';

// import { MobileNav } from "@/components/mobile-nav";
import Logo from '@/assests/luxe-attire-logo.png';
import Image from 'next/image';
import { Button } from './ui/button';

// @ts-ignore
export function MiscNav() {
  return (
    <>
      <div className="flex gap-6 lg:gap-10 text-2xl font-bold text-brand">
        <Link href="/">
          <Image
            src={Logo}
            width={500}
            height={500}
            alt="luxe attire logo"
            className=" w-[120px] "
          />
        </Link>
      </div>

      <nav className="flex items-center gap-3">
        <Link href="/products">
          <Button className=" bg-brand hover:bg-brand/90">All Products</Button>
        </Link>
      </nav>
    </>
  );
}
