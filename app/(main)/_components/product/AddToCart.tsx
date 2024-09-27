'use client';

import { ICartItem, addItem } from '@/lib/features/cartSlice';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { ColorPicker } from './ColorPicker';
import { SizePicker } from './SizePicker';

import { IProduct, TProduct } from '@/db/models/product-model';
import {
  setSelectedColor,
  setSelectedSize,
} from '@/lib/features/colorAndSizeSlice';

export default function AddToCart({
  productId,
  colors,
  sizes,
}: {
  productId: string;
  colors: TProduct['colors'];
  sizes: TProduct['sizes'];
}) {
  const dispatch = useDispatch();

  // Get selected color and size from the Redux store
  const selectedColor = useSelector(
    (state: RootState) => state.selectedColorAndSize.selectedColor
  );
  const selectedSize = useSelector(
    (state: RootState) => state.selectedColorAndSize.selectedSize
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Check if the product is already in the cart
  const isProductInCart = cartItems.some(
    (item: ICartItem) => item.productId === productId
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
      const cartProduct: ICartItem = {
        productId: productId,
        name: 'Winter jacket', // Replace with the actual product name
        price: 500, // Replace with the actual product price
        size: selectedSize,
        color: selectedColor,
        image:
          'https://img.freepik.com/free-photo/young-caucasian-girl-wearing-black-t-shirt-isolated-orange-wall_141793-36030.jpg?t=st=1726480118~exp=1726483718~hmac=a80ca7bb30c18474fa6438832d6b2fb0e195e080f7835e884005941a20e9faf9&w=740', // Replace with actual product image
        quantity: 1,
      };

      dispatch(addItem(cartProduct));
    }
  };

  // Dispatch the selected color and size using Redux actions
  const handleColorChange = (color: IProduct['colors'][0]) => {
    dispatch(setSelectedColor(color));
  };

  const handleSizeChange = (size: string) => {
    dispatch(setSelectedSize(size));
  };

  return (
    <>
      <ColorPicker
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={handleColorChange} // Use Redux handler
      />
      <SizePicker
        sizes={sizes}
        selectedSize={selectedSize}
        setSelectedSize={handleSizeChange} // Use Redux handler
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
