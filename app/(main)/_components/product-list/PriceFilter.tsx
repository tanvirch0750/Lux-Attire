'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PRICE_OPTIONS = [
  { label: 'Under 100', value: 'under-100' },
  { label: '100 - 200', value: '100-200' },
  { label: '201 - 300', value: '201-300' },
  { label: 'Above 300', value: 'above-300' },
];

export default function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handlePriceRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.has('price')) {
      const priceRanges = params.getAll('price');
      if (priceRanges.includes(value)) {
        params.delete('price');
        priceRanges.forEach((range) => {
          if (range !== value) {
            params.append('price', range);
          }
        });
      } else {
        params.append('price', value);
      }
    } else {
      params.append('price', value);
    }

    router.replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <AccordionItem value="price">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-primary text-lg">Price Range</span>
      </AccordionTrigger>

      <AccordionContent className="pt-6 animate-none">
        <ul className="space-y-4">
          {PRICE_OPTIONS.map((option) => (
            <li key={option.value} className="flex items-center">
              <Checkbox
                id={`price-${option.value}`}
                onCheckedChange={() => handlePriceRangeChange(option.value)}
                checked={
                  searchParams.has('price') &&
                  searchParams.getAll('price').includes(option.value)
                }
              />
              <label
                htmlFor={`price-${option.value}`}
                className="ml-3 text-sm text-gray-600 cursor-pointer"
              >
                {option.label}
              </label>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
}
