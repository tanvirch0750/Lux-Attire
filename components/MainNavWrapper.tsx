import { auth } from '@/auth';
import { getUserByEmail } from '@/db/actions-and-queries/user/user-query';
import { MainNav } from './MainNav';

const navLinks = [
  {
    title: 'All Products',
    href: '/products',
  },
  {
    title: "Womens's Wear",
    href: '/products/womens-collection',
  },
  {
    title: "Men's Wear",
    href: '/products/mens-collection',
  },
  {
    title: "Kids's Wear",
    href: '/products/kids-wear',
  },
  {
    title: 'Traditional',
    href: '/products/traditional-clothing',
  },
  {
    title: 'Accessories',
    href: '/products/accessories',
  },
];

export default async function MainNavWrapper({}) {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);

  return (
    // @ts-ignore
    <MainNav items={navLinks} userImge={user?.profilePicture} />
  );
}
