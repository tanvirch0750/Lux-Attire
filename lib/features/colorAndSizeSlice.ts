import { IProduct, TProduct } from '@/db/models/product-model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ColorSizeState {
  selectedColor: TProduct['colors'][0];
  selectedSize: string;
  selectedImage: TProduct['images'][0] | null; // Add selectedImage field
}

const initialState: ColorSizeState = {
  selectedColor: { name: '', bgColor: '', selectedColor: '' },
  selectedSize: '',
  selectedImage: null, // Default selectedImage state
};

export const colorSizeSlice = createSlice({
  name: 'colorSizeState',
  initialState,
  reducers: {
    setSelectedColor: (
      state,
      action: PayloadAction<{
        color: TProduct['colors'][0];
        images: TProduct['images'];
      }>
    ) => {
      state.selectedColor = action.payload.color;

      // Find and set the image corresponding to the selected color
      const image = action.payload.images.find(
        (img) => img.color === action.payload.color.bgColor
      );
      state.selectedImage = image || null; // Set the image or null if not found
    },
    setSelectedSize: (state, action: PayloadAction<string>) => {
      state.selectedSize = action.payload;
    },
    resetSelectedSizeAndColor: (state) => {
      // Reset the whole state back to the initial values
      state.selectedColor = initialState.selectedColor;
      state.selectedSize = initialState.selectedSize;
      state.selectedImage = initialState.selectedImage;
    },
  },
});

export const { setSelectedColor, setSelectedSize, resetSelectedSizeAndColor } =
  colorSizeSlice.actions;

export default colorSizeSlice.reducer;
