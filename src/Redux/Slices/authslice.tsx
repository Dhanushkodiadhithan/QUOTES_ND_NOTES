// src/store/authSlice.ts
import { createSlice} from "@reduxjs/toolkit";
import {type PayloadAction } from "@reduxjs/toolkit";
interface UserState {
  currentUser: {
    uid: string;
    email: string | null;
    [key: string]: any;
  } | null;
}

const initialState: UserState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      // You can customize what user info to store here
      state.currentUser = {
        uid: action.payload.uid,
        email: action.payload.email,
        ...action.payload,
      };
    },
    clearUser(state) {
      state.currentUser = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
