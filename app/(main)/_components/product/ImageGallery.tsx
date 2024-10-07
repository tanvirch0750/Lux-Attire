'use client';

import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Image from 'next/image';
import { RootState } from '@/lib/store';
import { TProduct } from '@/db/models/product-model';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function ImageGallery({
  images,
}: {
  images: TProduct['images'];
}) {
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const selectedColor = useSelector(
    (state: RootState) => state.selectedColorAndSize.selectedColor.bgColor
  );

  const sortedImages = [...images].sort((a, b) => {
    if (selectedColor && a.color === selectedColor) return -1;
    if (selectedColor && b.color === selectedColor) return 1;
    return a.primary ? -1 : 1;
  });

  const handleImageLoad = (id: string) => {
    setImagesLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
      <h2 className="sr-only">Images</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-4">
        {sortedImages.map((image, index) => (
          <div
            key={image.id}
            className={clsx(
              index === 0 || image.color === selectedColor
                ? 'lg:col-span-2 lg:row-span-2'
                : 'lg:col-span-1 lg:row-span-1',
              'relative aspect-square'
            )}
          >
            {!imagesLoaded[image.id] && (
              <Skeleton className="absolute inset-0 bg-gray-200 rounded-lg" />
            )}
            <Image
              src={image.imageSrc}
              alt={image.imageAlt}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className={clsx(
                'rounded-lg object-cover',
                imagesLoaded[image.id] ? 'opacity-100' : 'opacity-0'
              )}
              onLoad={() => handleImageLoad(image.id)}
              priority={index === 0}
              quality={95}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Shimmer effect
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);
