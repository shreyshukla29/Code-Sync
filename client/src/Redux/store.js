import { configureStore } from "@reduxjs/toolkit";
import AuthSliceReducer from "./Slices/Auth.slice";


export const store = configureStore({
  reducer: {
    auth: AuthSliceReducer,
  },
  devTools: true,
});
