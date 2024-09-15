import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  search: string;
  sort: string;
  colors: string[];
  priceRanges: string[];
  categories: string[];
}

const initialState: FilterState = {
  search: '',
  sort: '',
  colors: [],
  priceRanges: [],
  categories: [],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    toggleColor(state, action: PayloadAction<string>) {
      const color = action.payload;
      if (state.colors.includes(color)) {
        state.colors = state.colors.filter((col) => col !== color);
      } else {
        state.colors.push(color);
      }
    },
    togglePriceRange(state, action: PayloadAction<string>) {
      const range = action.payload;
      if (state.priceRanges.includes(range)) {
        state.priceRanges = state.priceRanges.filter((pr) => pr !== range);
      } else {
        state.priceRanges.push(range);
      }
    },
    toggleCategory(state, action: PayloadAction<string>) {
      const category = action.payload;
      if (state.categories.includes(category)) {
        state.categories = state.categories.filter((cat) => cat !== category);
      } else {
        state.categories.push(category);
      }
    },
    clearFilters(state) {
      state.search = '';
      state.sort = '';
      state.colors = [];
      state.priceRanges = [];
      state.categories = [];
    },
  },
});

export const {
  setSearch,
  setSort,
  toggleColor,
  togglePriceRange,
  toggleCategory,
  clearFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
