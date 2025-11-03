import { configureStore } from "@reduxjs/toolkit";
import justSlice from "./Slices/Justslice";
import Feedslice from "./Slices/Feedslice";
import authSlice from "./Slices/authSlice"; // 👈 we'll create this next

const store = configureStore({
  reducer: {
    just: justSlice,
    feeds: Feedslice,
    auth: authSlice, // 👈 add this
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
