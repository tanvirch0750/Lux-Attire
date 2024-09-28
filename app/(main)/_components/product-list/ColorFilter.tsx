'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const COLOR_OPTIONS = [
  { label: 'Blue', value: 'blue' },
  { label: 'Red', value: 'red' },
  { label: 'Black', value: 'black' },
  { label: 'Yellow', value: 'yellow' },
  { label: 'Green', value: 'green' },
  { label: 'White', value: 'white' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pink', value: 'pink' },
  { label: 'Purple', value: 'purple' },
];

export default function ColorFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const handleColorChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.has('color')) {
      const colors = params.getAll('color');
      if (colors.includes(value)) {
        params.delete('color');
        colors.forEach((color) => {
          if (color !== value) {
            params.append('color', color);
          }
        });
      } else {
        params.append('color', value);
      }
    } else {
      params.append('color', value);
    }

    router.replace(`${pathName}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <AccordionItem value="color">
      <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
        <span className="font-medium text-primary text-lg">Color</span>
      </AccordionTrigger>

      <AccordionContent className="pt-6 animate-none">
        <ul className="space-y-4">
          {COLOR_OPTIONS.map((option) => (
            <li key={option.value} className="flex items-center">
              <Checkbox
                id={`color-${option.value}`}
                onCheckedChange={() => handleColorChange(option.value)}
                checked={
                  searchParams.has('color') &&
                  searchParams.getAll('color').includes(option.value)
                }
              />
              <label
                htmlFor={`color-${option.value}`}
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
