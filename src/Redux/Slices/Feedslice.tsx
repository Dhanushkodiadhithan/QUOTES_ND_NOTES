import { createSlice } from "@reduxjs/toolkit";

interface Feedquotes {
  activeCategory: string;
  allQuotes: Array<{
    _id: string;
    text: string;
    author: string;
    category: string;
    tags: string[];
    image?: string;
    likes: number;
    likedBy?: string[];
    shares?: number;
    sharedBy?: string[];
    savedBy?: string[];
    isPublic?: boolean;
    createdAt?: string;
    updatedAt?: string;
  }>;
}

const initialState: Feedquotes = {
  activeCategory: "All Quotes",
  allQuotes: [],
};

const Feedslice = createSlice({
  name: "feeds",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setAllQuotes: (state, action) => {
      state.allQuotes = action.payload;
    }
  },
});
export const { changeCategory ,setAllQuotes} = Feedslice.actions;
export default Feedslice.reducer;
