import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingCartIcon } from 'lucide-react';
import { CartItems } from './CartItems';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '@radix-ui/react-dropdown-menu';
import CartChekcout from './CartChekcout';

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const cartItems = [
  {
    name: 'Polaroid camera',
    description: 'Classic',
    price: '59.99',
    oldPrice: '75.50',
    image:
      'https://img.freepik.com/free-photo/young-caucasian-girl-wearing-black-t-shirt-isolated-orange-wall_141793-36030.jpg?t=st=1726480118~exp=1726483718~hmac=a80ca7bb30c18474fa6438832d6b2fb0e195e080f7835e884005941a20e9faf9&w=740',
  },

  {
    name: 'Replica headphones',
    description: 'White',
    price: '99.95',
    oldPrice: '150',
    image:
      'https://img.freepik.com/free-photo/young-caucasian-girl-wearing-black-t-shirt-isolated-orange-wall_141793-36030.jpg?t=st=1726480118~exp=1726483718~hmac=a80ca7bb30c18474fa6438832d6b2fb0e195e080f7835e884005941a20e9faf9&w=740',
  },
  {
    name: 'Set of travel chargers',
    description: 'Black',
    price: '8.99',
    oldPrice: '15.99',
    image:
      'https://img.freepik.com/free-photo/young-caucasian-girl-wearing-black-t-shirt-isolated-orange-wall_141793-36030.jpg?t=st=1726480118~exp=1726483718~hmac=a80ca7bb30c18474fa6438832d6b2fb0e195e080f7835e884005941a20e9faf9&w=740',
  },
];

export default function Cart() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative inline-block pl-5">
          {/* Cart Icon */}
          <ShoppingCartIcon className="h-8 w-8 text-primary" />

          {/* Number Badge */}
          {cartItems.length > 0 && (
            <span className="absolute top-[-5px] right-[-14px] h-6 w-6 flex items-center justify-center rounded-full bg-brand text-white text-xs font-bold leading-tight text-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className=" bg-white flex flex-col justify-between">
        {/* <CartItems cartItems={cartItems} />
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
        <h2 className="text-xl font-semibold">Your carts</h2>
        <ScrollArea className="flex-1 w-full rounded-md border mt-3">
          <CartItems cartItems={cartItems} />
        </ScrollArea>
        <CartChekcout />
      </SheetContent>
    </Sheet>
  );
}
