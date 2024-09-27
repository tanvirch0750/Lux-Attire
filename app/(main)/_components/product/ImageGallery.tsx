'use client';

import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Image from 'next/image'; // Or the correct image component
import { RootState } from '@/lib/store';
import { TProduct } from '@/db/models/product-model';

export function ImageGallery({ images }: { images: TProduct['images'] }) {
  // Get the selected color from the Redux store
  const selectedColor = useSelector(
    (state: RootState) => state.selectedColorAndSize.selectedColor.bgColor
  );

  // Sort images: priority to selectedColor, then primary, then others
  const sortedImages = [...images].sort((a, b) => {
    if (selectedColor && a.color === selectedColor) return -1;
    if (selectedColor && b.color === selectedColor) return 1;
    return a.primary ? -1 : 1;
  });

  return (
    <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
      <h2 className="sr-only">Images</h2>

      {/* Adjust the grid structure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-4">
        {sortedImages.map((image, index) => (
          <Image
            key={image.id}
            src={image.imageSrc}
            alt={image.imageAlt}
            width={1000}
            height={1000}
            className={clsx(
              // If it's the first image or matches the selected color, make it span larger
              index === 0 || image.color === selectedColor
                ? 'lg:col-span-2 lg:row-span-2'
                : 'lg:col-span-1 lg:row-span-1',
              'rounded-lg object-cover'
            )}
          />
        ))}
      </div>
    </div>
  );
}
