import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct } from '@/db/models/product-model';

export interface IWishlistItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistState {
  items: IWishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<IWishlistItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (!existingItem) {
        state.items.push(action.payload);
      }
    },
    removeItemFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },
    resetWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addItemToWishlist, removeItemFromWishlist, resetWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
