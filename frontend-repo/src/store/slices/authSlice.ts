import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/services/request";

interface authType {
  email?: string;
  password?: string;
  fullName?: string;
  phoneNumber?: string;
}

interface AuthState {
  loading: boolean | undefined;
  error: object | undefined;
  data: object | undefined;
}

const initialState: AuthState = {
  loading: undefined,
  error: undefined,
  data: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = action.payload;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.data = undefined;
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.data = undefined;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.data = undefined;
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.data = undefined;
      });
  },
});

export const signUpUser = createAsyncThunk("auth/signUp", async ({ email, password, fullName, phoneNumber }: authType, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`/api/auth/sign-up`, { email, password, fullName, phoneNumber });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message || "Sign Up Failed");
    }
    return thunkAPI.rejectWithValue("An Unknown Error Occurred");
  }
});

export const signInUser = createAsyncThunk("auth/signIn", async ({ email, password }: authType, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`/api/auth/sign-in`, { email, password });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message || "Sign In Failed");
    }
    return thunkAPI.rejectWithValue("An Unknown Error Occurred");
  }
});

export default authSlice.reducer;
