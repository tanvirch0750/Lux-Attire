'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const CATEGORY_OPTIONS = [
  { id: 1, label: "Women's Collection", value: 'womens-collection' },
  { id: 3, label: 'Active Wear', value: 'active-wear' },
  { id: 4, label: 'Kids Wear', value: 'kids-wear' },
  { id: 5, label: 'Traditional Clothing', value: 'traditional-clothing' },
  { id: 6, label: "Men's Collection", value: 'mens-collection' },
  { id: 7, label: 'Accessories', value: 'accessories' },
];

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleCategoryChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.has('category')) {
      const categories = params.getAll('category');
      if (categories.includes(value)) {
        params.delete('category');
        categories.forEach((category) => {
          if (category !== value) {
            params.append('category', category);
          }
        });
      } else {
        params.append('category', value);
      }
    } else {
      params.append('category', value);
    }

    router.replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <AccordionItem value="categories" className="">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-gray-900 text-lg">Categories</span>
      </AccordionTrigger>

      <AccordionContent className="pt-6 animate-none">
        <ul className="space-y-4">
          {CATEGORY_OPTIONS.map((option) => (
            <li key={option.value} className="flex items-center">
              <Checkbox
                id={`category-${option.id}`}
                onCheckedChange={() => handleCategoryChange(option.value)}
                checked={
                  searchParams.has('category') &&
                  searchParams.getAll('category').includes(option.value)
                }
              />
              <label
                htmlFor={`category-${option.id}`}
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
