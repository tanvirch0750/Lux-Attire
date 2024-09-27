import { IProduct } from '@/db/models/product-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorSizeState {
  selectedColor: IProduct['colors'][0];
  selectedSize: string;
}

const initialState: ColorSizeState = {
  selectedColor: {name: '', bgColor:  '', selectedColor: ''},
  selectedSize: '', // Default size state
};

export const colorSizeSlice = createSlice({
  name: 'colorSizeState',
  initialState,
  reducers: {
    setSelectedColor: (state, action: PayloadAction<IProduct['colors'][0]>) => {
      state.selectedColor = action.payload;
    },
    setSelectedSize: (state, action: PayloadAction<string>) => {
      state.selectedSize = action.payload;
    },
  },
});

export const { setSelectedColor, setSelectedSize } = colorSizeSlice.actions;

export default colorSizeSlice.reducer;
