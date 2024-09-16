import { combineReducers, configureStore } from '@reduxjs/toolkit';
import filterReducer from './features/filterSlice';
import cartReducer from './features/cartSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Create a persist config
const persistConfig = {
  key: 'root', // key for the persisted state in storage
  storage, // the storage engine to use (e.g., localStorage)
  whitelist: ['cart'], // the reducers you want to persist
};

const rootReducer = combineReducers({
  cart: cartReducer,
  filters: filterReducer,
});

// Create a persisted reducer using the persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }),
});

// Create the persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
