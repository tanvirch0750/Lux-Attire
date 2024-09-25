'use client';

import { addItem } from '@/lib/features/cartSlice';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { ColorPicker } from './ColorPicker';
import { SizePicker } from './SizePicker';
import { useState } from 'react';

export default function AddToCart({
  productId,
  product,
}: {
  productId: string;
  product: any;
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);

  // Check if the product is already in the cart
  const isProductInCart = cartItems.some(
    (item: any) => item.productId === productId
  );

  // Check if size and color are selected
  const isSizeAndColorSelected = selectedSize && selectedColor;

  // Determine button state and text
  const isButtonDisabled = !isSizeAndColorSelected || isProductInCart;
  const buttonText = isProductInCart
    ? 'Already added to cart'
    : !isSizeAndColorSelected
    ? 'Select size and color'
    : 'Add to cart';

  const handleAddToCart = () => {
    if (!isButtonDisabled) {
      const cartProduct = {
        productId: productId,
        name: 'Winter jacket',
        price: 500,
        size: selectedSize,
        color: selectedColor,
        image:
          'https://img.freepik.com/free-photo/young-caucasian-girl-wearing-black-t-shirt-isolated-orange-wall_141793-36030.jpg?t=st=1726480118~exp=1726483718~hmac=a80ca7bb30c18474fa6438832d6b2fb0e195e080f7835e884005941a20e9faf9&w=740',
        quantity: 1,
      };

      dispatch(addItem(cartProduct));
    }
  };

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
      <button
        onClick={handleAddToCart}
        type="submit"
        disabled={isButtonDisabled}
        className={`mt-8 flex w-full items-center justify-center rounded-md border border-transparent 
                  ${
                    isButtonDisabled
                      ? 'bg-gray-400 hover:bg-gray-400'
                      : 'bg-brand'
                  } 
                  px-8 py-3 text-base font-medium text-white hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`}
      >
        {buttonText}
      </button>
    </>
  );
}
