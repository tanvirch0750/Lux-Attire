import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const adminRoutes = [
  '/dashboard',
  '/dashboard/products',
  '/dashboard/products/add-product',
  '/dashboard/orders',
];

const userRoutes = [
  '/my-orders',
  '/checkout',
  '/my-profile',
  '/order-successful',
];

export async function middleware(req: NextRequest) {
  // @ts-ignore
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('request', req);

  console.log('next auth secret', process.env.NEXTAUTH_SECRET);

  console.log('token ', token);

  const { pathname } = req.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/',
    '/kids-wear',
    '/traditional-clothing',
    '/menswear',
  ];

  // Routes that should not be accessible to authenticated users
  const authRestrictedRoutes = ['/login', '/register'];

  console.log('token role', token?.role);

  // If no token is present, redirect to login
  if (!token) {
    console.log('No token, redirecting to login.');
    if (
      !publicRoutes.includes(pathname) &&
      !authRestrictedRoutes.includes(pathname)
    ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next(); // Let user access public routes
  }

  console.log('Token validated:', token);

  // If the user is logged in and tries to access login or register, redirect to a protected route
  if (token && authRestrictedRoutes.includes(pathname)) {
    if (token.role === 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    if (token.role === 'user') {
      return NextResponse.redirect(new URL('/products', req.url));
    }
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Role-based access control for admin routes
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  // Role-based access control for user-only routes
  if (userRoutes.some((route) => pathname.startsWith(route))) {
    if (token.role !== 'user') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

// Apply the middleware to the following routes
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/',
    '/login',
    '/register',
    '/my-orders',
    '/my-orders/:path*',
    '/checkout',
    '/my-profile',
    '/order-successful',
    '/order-successful/:path*',
  ],
};
