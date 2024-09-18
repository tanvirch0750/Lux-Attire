import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterReducer from './features/filterSlice';
import cartReducer from './features/cartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sidebarSlice from './features/sidebarSlice';

// Create a persist config
const persistConfig = {
  key: 'root', // key for the persisted state in storage
  storage, // the storage engine to use (e.g., localStorage)
  whitelist: ['cart'], // the reducers you want to persist
};

const rootReducer = combineReducers({
  cart: cartReducer,
  filters: filterReducer,
  sidebar: sidebarSlice,
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
    let store: any = configureStore({
      reducer: persistedReducer,
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
