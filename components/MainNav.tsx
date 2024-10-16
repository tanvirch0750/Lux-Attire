/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// import { MobileNav } from "@/components/mobile-nav";
import Logo from '@/assests/luxe-attire-logo.png';
import Image from 'next/image';
import { buttonVariants } from './ui/button';
import { Menu, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { MobileNav } from './MobileNav';
import Cart from '../app/(main)/_components/cart/Cart';
import { Session } from 'next-auth';
import Wishlist from '@/app/(main)/_components/wishlist/WishList';

// @ts-ignore
export function MainNav({ items, children, userImage }) {
  const { data: session } = useSession();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [loginSession, setLoginSession] = useState<Session | null>(null);
  const pathname = usePathname();
  const isActive = (path: string) => path === pathname;

  useEffect(() => {
    setLoginSession(session);
  }, [session]);

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
      <div className="">
        {items?.length ? (
          <nav className="hidden gap-6  xl:flex">
            {items?.map((item: any, index: any) => (
              <Link
                key={index}
                href={item.disabled ? '#' : item.href}
                className={cn(
                  `flex items-center text-[16px] font-medium transition-colors ${
                    isActive(item.href) ? 'text-brand' : 'text-primary'
                  } hover:text-brand`
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        ) : null}

        {showMobileMenu && items && (
          <MobileNav items={items}>{children}</MobileNav>
        )}
      </div>
      <nav className="flex items-center gap-3">
        <div className="items-center gap-3 hidden xl:flex ">
          {!loginSession && (
            <>
              <Link
                href="/login"
                className={cn(buttonVariants({ size: 'sm' }), 'px-8')}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={cn(
                  buttonVariants({ size: 'sm' }),
                  'px-8 bg-brand hover:bg-brand/90'
                )}
              >
                Register
              </Link>
            </>
          )}
          <Cart />
          <Wishlist />
        </div>

        {loginSession && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer pl-6">
                <Avatar>
                  <AvatarImage
                    src={
                      userImage ||
                      session?.user?.image ||
                      'https://github.com/shadcn.png'
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {session?.user?.name ? session.user.name.charAt(0) : 'U'}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-4">
              {/* @ts-ignore */}
              {loginSession?.user?.role === 'user' && (
                <>
                  {' '}
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/my-profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/my-orders">My Orders</Link>
                  </DropdownMenuItem>
                </>
              )}

              {/* @ts-ignore */}
              {loginSession?.user?.role === 'admin' && (
                <>
                  {' '}
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/dashboard/products">Products</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href="/dashboard/orders">Orders</Link>
                  </DropdownMenuItem>
                </>
              )}

              {loginSession && (
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link
                    href="#"
                    onClick={() => {
                      signOut({ callbackUrl: '/login' });
                    }}
                  >
                    Logout
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <button
          className="flex items-center space-x-2 xl:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <X /> : <Menu />}
        </button>
      </nav>
    </>
  );
}
