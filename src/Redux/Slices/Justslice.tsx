import { createSlice } from "@reduxjs/toolkit";

interface JustState {
  showUploadQuote: boolean;
}

const initialState: JustState = {
  showUploadQuote: false,
};

const justSlice = createSlice({
  name: "just",
  initialState,
  reducers: {
    ToggleShow: (state) => {
      state.showUploadQuote = !state.showUploadQuote;
    },
  },
});
export const { ToggleShow } = justSlice.actions;
export default justSlice.reducer;