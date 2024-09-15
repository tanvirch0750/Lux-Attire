'use client';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { toggleColor } from '@/lib/features/filterSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';

const COLOR_OPTIONS = [
  { label: 'Blue', value: 'blue' },
  { label: 'Red', value: 'red' },
  { label: 'Yellow', value: 'yellow' },
];

export default function ColorFilter() {
  const dispatch = useAppDispatch();
  const colors = useAppSelector((state: RootState) => state.filters.colors);

  const handleColorChange = (value: string) => {
    dispatch(toggleColor(value));
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
                // @ts-ignore
                type="checkbox"
                id={`color-${option.value}`}
                onCheckedChange={() => handleColorChange(option.value)}
                checked={colors.includes(option.value)}
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
