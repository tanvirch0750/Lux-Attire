'use client';

import clsx from 'clsx';
import { RadioGroup } from '@headlessui/react';
import { IProduct, TProduct } from '@/db/models/product-model';

export function ColorPicker({
  colors,
  setSelectedColor,
  selectedColor,
}: {
  colors: any;
  selectedColor: any;
  setSelectedColor: any;
}) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-900">Color</h2>

      <RadioGroup
        value={selectedColor}
        onChange={setSelectedColor}
        className="mt-2"
      >
        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
        <div className="flex items-center space-x-3">
          {colors?.map((color: IProduct['colors'][0]) => (
            <RadioGroup.Option
              key={color.name} // Use _id as a unique key
              value={color}
              className={({ active, checked }) =>
                clsx(
                  active && checked
                    ? `ring ring-offset-1 ring-[${color.selectedColor}]` // Active and checked state
                    : checked
                    ? `ring-2 ring-[${color.selectedColor}]` // Just checked state
                    : '', // No ring if not selected
                  `relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-[${color?.selectedColor}]`
                )
              }
            >
              <RadioGroup.Label as="span" className="sr-only">
                {color.name}
              </RadioGroup.Label>
              <span
                aria-hidden="true"
                style={{ backgroundColor: color.bgColor }} // Inline style for dynamic background color
                className="h-8 w-8 rounded-full border border-black border-opacity-10"
              />
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
