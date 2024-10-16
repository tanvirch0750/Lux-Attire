'use client';

import { ICartItem, addItem } from '@/lib/features/cartSlice';
import { RootState } from '@/lib/store';
import { useDispatch, useSelector } from 'react-redux';
import { ColorPicker } from './ColorPicker';
import { SizePicker } from './SizePicker';
import { IOffer, IProduct, TProduct } from '@/db/models/product-model';
import {
  resetSelectedSizeAndColor,
  setSelectedColor,
  setSelectedSize,
} from '@/lib/features/colorAndSizeSlice';
import { useEffect } from 'react';
import AddToWishListButton from '../wishlist/AddToWishListButton';
import { IWishlistItem } from '@/lib/features/wishListSlice';
import { Badge } from '@/components/ui/badge';
import { Truck } from 'lucide-react';
import { toast } from 'react-toastify';
import { isOfferDateValidUntil } from '@/lib/utils';

// Utility function to calculate discounted price based on offers
const calculateDiscountedPrice = (originalPrice: number, discount: number) => {
  return originalPrice - (originalPrice * discount) / 100;
};

export default function AddToCart({
  productId,
  colors,
  sizes,
  images,
  price, // Original price
  name,
  category,
  offers,
}: {
  productId: string;
  colors: TProduct['colors'];
  sizes: TProduct['colors'];
  images: TProduct['images'];
  price: number;
  name: string;
  category: string;
  offers: IOffer[];
}) {
  const dispatch = useDispatch();

  // Get selected color and size from the Redux store
  const selectedColor = useSelector(
    (state: RootState) => state.selectedColorAndSize.selectedColor
  );
  const selectedSize = useSelector(
    (state: RootState) => state.selectedColorAndSize.selectedSize
  );
  const selectedImage = useSelector(
    (state: RootState) => state.selectedColorAndSize.selectedImage
  );
  // const cartItems = useSelector((state: RootState) => state.cart.items);

  // Check if the product is already in the cart
  // const isProductInCart = cartItems.some(
  //   (item: ICartItem) => item.productId === productId
  // );

  const isProductInCart = false;

  // Check if size and color are selected
  const isSizeAndColorSelected = selectedSize && selectedColor?.name;
  // const isSizeAndColorSelected = false;

  // Determine button state and text
  const isButtonDisabled = !isSizeAndColorSelected || isProductInCart;
  const buttonText = isProductInCart
    ? 'Already added to cart'
    : !isSizeAndColorSelected
    ? 'Select size and color'
    : 'Add to cart';

  const activeOffers =
    offers?.filter(
      (offer) => offer.isActive && isOfferDateValidUntil(offer.validUntil)
    ) || [];

  const shippingOffer = activeOffers.find(
    (offer) => offer.offerType === 'freeShipping'
  );

  const handleAddToCart = () => {
    if (!isButtonDisabled) {
      const cartProduct: ICartItem = {
        productId: productId,
        name,
        price, // Set the discounted price (if applicable)
        oldPrice: price, // Always set the original price
        // @ts-ignore,
        size: selectedSize,
        color: selectedColor,
        // @ts-ignore
        image: selectedImage,
        quantity: 1,
        offers: offers,
        category: category,
      };

      dispatch(addItem(cartProduct)); // Dispatch updated cart product
      dispatch(resetSelectedSizeAndColor());

      toast.success('Product added to the cart', {
        position: 'top-center',
      });
    }
  };

  // Dispatch the selected color and size using Redux actions
  const handleColorChange = (color: IProduct['colors'][0]) => {
    dispatch(setSelectedColor({ color, images }));
    dispatch(setSelectedSize(''));
  };

  const handleSizeChange = (size: string) => {
    dispatch(setSelectedSize(size));
  };

  const wishListData: IWishlistItem = {
    productId: productId,
    name: name,
    price: price, // Wishlist should store the original price
    image: selectedImage?.imageSrc as string,
    category: category,
  };

  // Reset color and size when product changes
  useEffect(() => {
    dispatch(resetSelectedSizeAndColor());
  }, [productId, dispatch]);

  return (
    <>
      <div className="flex items-center justify-between">
        <ColorPicker
          colors={colors}
          selectedColor={selectedColor}
          setSelectedColor={handleColorChange}
        />

        <AddToWishListButton product={wishListData} isHidden={false} />
      </div>
      <SizePicker
        sizes={sizes}
        selectedSize={selectedSize}
        setSelectedSize={handleSizeChange}
        selectedColor={selectedColor}
      />
      {shippingOffer && (
        <Badge variant="secondary" className="mt-4 text-[16px] text-brand">
          <Truck className="mr-1 h-4 w-4" />
          Free Shipping
        </Badge>
      )}
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
