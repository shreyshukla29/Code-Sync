import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/Auth.slice";
import fileSliceReducer from "./Slices/File.slice"

export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
    file:fileSliceReducer
  },
  devTools: true,
});
