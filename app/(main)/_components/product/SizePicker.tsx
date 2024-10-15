'use client';

import clsx from 'clsx';
import { RadioGroup } from '@headlessui/react';
import { SizeDescription } from './SizeDescription';
// import { SizeDescription } from './SizeDescription';

export function SizePicker({
  sizes,
  selectedSize,
  setSelectedSize,
  selectedColor,
}: {
  sizes: any;
  selectedSize: any;
  setSelectedSize: any;
  selectedColor: any;
}) {
  // Find the selected color from the sizes array
  const selectedColorData = sizes?.find(
    (color: any) =>
      color?.name?.toLowerCase() === selectedColor?.name?.toLowerCase()
  );

  // If no color matches, return an empty array
  const availableSizes = selectedColorData ? selectedColorData?.sizeStocks : [];

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Size</h2>
        {availableSizes[0]?.sizeMetric && (
          <SizeDescription sizes={availableSizes} />
        )}
        {/* <SizeDescription /> */}
      </div>

      {selectedColor?.name ? (
        <>
          <RadioGroup
            value={selectedSize}
            onChange={setSelectedSize}
            className="mt-2"
          >
            <RadioGroup.Label className="sr-only">
              Choose a size
            </RadioGroup.Label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {availableSizes.map((size: any) => (
                <RadioGroup.Option
                  key={size.size}
                  value={size.size}
                  className={({ active, checked }) =>
                    clsx(
                      size.isAvailable && size.stock > 0
                        ? 'cursor-pointer focus:outline-none'
                        : 'cursor-not-allowed opacity-25',
                      active ? 'ring-2 ring-slate-500 ring-offset-2' : '',
                      checked
                        ? 'border-transparent bg-primary text-white hover:bg-primary/85'
                        : 'border-gray-200 bg-white text-gray-900 hover:bg-gray-50',
                      'flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1'
                    )
                  }
                  disabled={!size.isAvailable || size.stock < 1}
                >
                  <RadioGroup.Label as="span">{size.size}</RadioGroup.Label>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </>
      ) : (
        <div className=" mt-3">
          <span className="text-sm text-gray-700 bg-yellow-100 border border-yellow-300 rounded-md px-4 py-2 w-full inline-block text-center font-semibold">
            Choose a color to see available sizes
          </span>
        </div>
      )}
    </div>
  );
}
