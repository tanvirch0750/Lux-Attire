'use client';

import Link from 'next/link';
import { ColorPicker } from './ColorPicker';
import { SizePicker } from './SizePicker';
import { useState } from 'react';

export default function AvailableDeatilsAdmin({ product }: { product: any }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  return (
    <>
      <ColorPicker
        colors={product?.colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <SizePicker
        sizes={product?.sizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
      <p>Available</p>
      <p>Not deleted</p>
      <Link
        href="/dashboard/edit/id"
        className={`mt-8 flex w-full items-center justify-center rounded-md 
                  
                  px-8 py-3 text-base font-medium text-white bg-brand hover:bg-brand `}
      >
        Edit
      </Link>
    </>
  );
}
