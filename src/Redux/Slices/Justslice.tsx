import { createSlice } from "@reduxjs/toolkit";

interface JustState {
  showUploadQuote: boolean;
  activeProfileTab:string;
}

const initialState: JustState = {
  showUploadQuote: false,
  activeProfileTab:"Account Settings",
};

const justSlice = createSlice({
  name: "just",
  initialState,
  reducers: {
    ToggleShow: (state) => {
      state.showUploadQuote = !state.showUploadQuote;
    },
    KeepUpload: (state, action) => {
      state.showUploadQuote = action.payload;
    },
    changeProfileTab: (state, action) => {
      state.activeProfileTab = action.payload;
    }
  },
});
export const { ToggleShow , changeProfileTab,KeepUpload} = justSlice.actions;
export default justSlice.reducer;