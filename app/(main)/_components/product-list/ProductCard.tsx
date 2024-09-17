import { Button } from '@/components/ui/button';
import { ShoppingBasketIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard() {
  return (
    <Link href="/products/123">
      <div
        className="group box-border overflow-hidden flex rounded-md cursor-pointer pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-product bg-white"
        role="button"
        title="Roadster Women Round Neck"
      >
        <div className="flex mb-3 md:mb-3.5 relative">
          <Image
            alt="Roadster Women Round Neck"
            src="https://img.freepik.com/free-photo/young-woman-red-polka-dot-outfit-with-smile-eyes-closed-posing-yellow-wall_197531-14265.jpg?uid=R15161155&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
            width={750}
            height={750}
            className="bg-gray-300 object-cover rounded-s-md w-full transition duration-200 ease-in rounded-md group-hover:rounded-b-none h-[300px]"
          />
        </div>
        <div className="w-full overflow-hidden p-2 md:px-2.5 xl:px-4">
          <h2 className="truncate mb-1 text-sm md:text-base font-semibold text-heading group-hover:text-brand">
            Roadster Women Round Neck
          </h2>
          <p className="text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate">
            Fendi began life in 1925 as a fur and leather specialty store in
            Rome.
          </p>
          <div className="font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading">
            <span className="inline-block false">$18.59</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
