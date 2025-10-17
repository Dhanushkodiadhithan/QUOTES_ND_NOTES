import { configureStore } from "@reduxjs/toolkit";
import justSlice from "./Slices/Justslice";
import Feedslice from "./Slices/Feedslice";
import authReducer from "./Slices/authslice";
const store = configureStore({
  reducer: {
    just: justSlice,
    feeds: Feedslice,
    auth: authReducer,
  },
});

export default store;
