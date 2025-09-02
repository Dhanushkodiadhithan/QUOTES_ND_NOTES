import { configureStore } from "@reduxjs/toolkit";
import justSlice from "../Redux/Slices/Justslice";
const store = configureStore({
  reducer: {
    just: justSlice
  },
});

export default store;