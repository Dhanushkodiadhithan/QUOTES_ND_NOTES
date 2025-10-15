import { createSlice } from "@reduxjs/toolkit";

interface Feedquotes {
  activeCategory:string;
}

const initialState: Feedquotes = {
  activeCategory:"All Quotes",
};

const Feedslice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.activeCategory = action.payload;
    }
  },
});
export const { changeCategory} = Feedslice.actions;
export default Feedslice.reducer;