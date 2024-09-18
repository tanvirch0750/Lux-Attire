// redux/slices/sidebarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SidebarState {
  isMinimized: boolean;
}

const initialState: SidebarState = {
  isMinimized: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isMinimized = !state.isMinimized;
    },
    setSidebarMinimized: (state, action: PayloadAction<boolean>) => {
      state.isMinimized = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarMinimized } = sidebarSlice.actions;

export default sidebarSlice.reducer;
