import { createSlice } from "@reduxjs/toolkit";

interface JustState {
  count: number;
}

const initialState: JustState = {
  count: 0,
};

const justSlice = createSlice({
  name: "just",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});
export const { increment, decrement } = justSlice.actions;
export default justSlice.reducer;