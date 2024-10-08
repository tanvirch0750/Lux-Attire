import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterReducer from './features/filterSlice';
import cartReducer from './features/cartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sidebarSlice from './features/sidebarSlice';
import colorSlice from './features/colorAndSizeSlice';
import wishListReducer from './features/wishListSlice';

// Create a persist config
const persistConfig = {
  key: 'root', // key for the persisted state in storage
  storage, // the storage engine to use (e.g., localStorage)
  whitelist: ['cart', 'wishlist'], // the reducers you want to persist
};

const rootReducer = combineReducers({
  cart: cartReducer,
  filters: filterReducer,
  sidebar: sidebarSlice,
  selectedColorAndSize: colorSlice,
  wishlist: wishListReducer,
});

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  });

// Create the Redux store
export const makeStore = () => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return makeConfiguredStore();
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = configureStore({
      reducer: persistedReducer,
    });
    // store.__persistor = persistStore(store);
    // return store;

    // Assert store type to include __persistor
    const typedStore = store as typeof store & { __persistor?: unknown };
    typedStore.__persistor = persistStore(typedStore);

    return typedStore;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
