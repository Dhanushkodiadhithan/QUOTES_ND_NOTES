import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// ✅ Define a proper User type
export interface User {
  uid: string;
  email: string;
}

// ✅ Define Auth state
interface AuthState {
  user: User | null;
}

// ✅ Initial state
const initialState: AuthState = {
  user: null,
};

// ✅ Create slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set logged-in user
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    // Clear user on logout
    clearUser: (state) => {
      state.user = null;
    },
  },
});

// ✅ Export actions & reducer
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
