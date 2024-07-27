import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import categorySlice from "./category.slice";
import cartSlice from "./cart.slice";

// Define the persist config
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine reducers and apply persistence
const rootReducer = combineReducers({
  categoryName: persistReducer(persistConfig, categorySlice),
  cart: persistReducer(persistConfig, cartSlice),
});

// Configure the Redux store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create and export the persistor
export const persistor = persistStore(store);
