import { TProduct } from '@/db/models/product-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  image: TProduct['images'][0];
  quantity: number;
  color: TProduct['colors'][0];
  size: TProduct['sizes'][0];
}

interface CartState {
  items: ICartItem[];
  totalAmount: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ICartItem>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalAmount += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.productId === action.payload
      );
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.totalAmount -= item.quantity;
        state.totalPrice -= item.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (item && action.payload.quantity > 0) {
        const quantityDifference = action.payload.quantity - item.quantity;
        state.totalAmount += quantityDifference;
        state.totalPrice += item.price * quantityDifference;
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
