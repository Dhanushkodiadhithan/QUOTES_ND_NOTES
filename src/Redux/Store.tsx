import { configureStore } from "@reduxjs/toolkit";
import justSlice from "./Slices/Justslice";
import Feedslice from "./Slices/Feedslice";
const store = configureStore({
  reducer: {
    just: justSlice,
    feeds: Feedslice,
  },
});

export default store;
