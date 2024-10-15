import { IOffer, TProduct } from '@/db/models/product-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isOfferDateValidUntil } from '../utils';

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  image: TProduct['images'][0];
  quantity: number;
  color: TProduct['colors'][0];
  size: string;
  offers: IOffer[];
  oldPrice?: number;
  category: string;
}

interface CartState {
  items: ICartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
) => {
  return price - (price * discountPercentage) / 100;
};

const getActiveOffers = (offers: IOffer[]) => {
  return offers.filter(
    (offer) => offer.isActive && isOfferDateValidUntil(offer.validUntil)
  );
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.color.bgColor === action.payload.color.bgColor &&
          item.size === action.payload.size
      );

      // Get active offers and calculate discounted price
      const activeOffers = getActiveOffers(action.payload.offers);

      console.log('inside redux cart', activeOffers);

      const discountOffer = activeOffers.find(
        (offer) => offer.offerType === 'discount'
      );
      const itemPrice = discountOffer
        ? calculateDiscountedPrice(
            action.payload.price,
            // @ts-ignore
            parseFloat(discountOffer.value)
          )
        : action.payload.price;

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        // Push the item to the cart with both oldPrice and discounted price
        state.items.push({
          ...action.payload,
          oldPrice: action.payload.price, // Store the original price here
          price: itemPrice, // Store the discounted price here (if applicable)
        });
      }

      // Update total price using discounted price
      state.totalPrice += itemPrice * action.payload.quantity;
    },

    removeItem: (
      state,
      action: PayloadAction<{
        productId: string;
        color: TProduct['colors'][0];
        size: string;
      }>
    ) => {
      const itemIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.color.bgColor === action.payload.color.bgColor &&
          item.size === action.payload.size
      );
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];

        // Update total price using the current price (discounted if applicable)
        state.totalPrice -= item.price * item.quantity;

        state.items.splice(itemIndex, 1);
      }
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        color: TProduct['colors'][0];
        size: string;
        quantity: number;
      }>
    ) => {
      const item = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.color.bgColor === action.payload.color.bgColor &&
          item.size === action.payload.size
      );
      if (item && action.payload.quantity > 0) {
        const quantityDifference = action.payload.quantity - item.quantity;

        // Update total price using the price stored in the item (discounted if applicable)
        state.totalPrice += item.price * quantityDifference;

        item.quantity = action.payload.quantity;
      }
    },

    resetCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
