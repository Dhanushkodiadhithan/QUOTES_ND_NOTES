import { configureStore } from "@reduxjs/toolkit";
import justSlice from "./Slices/Justslice";
import { authSlice } from "./Slices/authSlice";
import Feedslice from "./Slices/Feedslice";
const store = configureStore({
  reducer: {
    just: justSlice,
    feeds: Feedslice,
    auth: authSlice.reducer,
  },
});

export default store;
