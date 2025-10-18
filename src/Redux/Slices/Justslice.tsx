import { createSlice } from "@reduxjs/toolkit";

interface JustState {
  showUploadQuote: boolean;
  activeProfileTab:string;
  myContentTab?:string;
}

const initialState: JustState = {
  showUploadQuote: false,
  activeProfileTab:"Account Settings",
  myContentTab:"All Content",
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
    },
    changeContentTab:(state, action) =>{
      state.myContentTab = action.payload;
    }
  },
});
export const { ToggleShow , changeProfileTab,KeepUpload,changeContentTab} = justSlice.actions;
export default justSlice.reducer;