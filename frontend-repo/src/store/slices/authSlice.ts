import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  fullName: string | null;
}

const initialState: AuthState = {
  fullName: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
    signOut: (state) => {
      state.fullName = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
