import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import AuthSliceReducer from "./Slices/Auth.slice";
import fileSliceReducer from "./Slices/File.slice";

// Configure persistence only for the `file` slice
const filePersistConfig = {
  key: "file",
  storage,
};

// Apply persistReducer only to the `file` slice
const rootReducer = combineReducers({
  auth: AuthSliceReducer, // Non-persisted
  file: persistReducer(filePersistConfig, fileSliceReducer), // Persisted
});

// Create the store with the root reducer
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

// Export the persistor
export const persistor = persistStore(store);
