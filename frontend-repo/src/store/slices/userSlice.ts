import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "@/services/request";

interface userType {
  id?: string;
  email?: string;
  password?: string;
  fullName?: string;
  phoneNumber?: string;
}

interface UserState {
  loading: boolean | undefined;
  error: object | undefined;
  data: object | undefined;
}

const initialState: UserState = {
  loading: undefined,
  error: undefined,
  data: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = undefined;
        state.data = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        state.data = undefined;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = undefined;
        state.data = undefined;
      });
  },
});

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`/api/users/fetch-user-data`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message || "Get User Failed");
    }
    return thunkAPI.rejectWithValue("An Unknown Error Occurred");
  }
});

export const createUser = createAsyncThunk("user/createUser", async (userData: userType, thunkAPI) => {
  try {
    const response = await axiosInstance.post(`/api/users/create-user-data`, userData);
    thunkAPI.dispatch(getUser());
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message || "Create User Failed");
    }
    return thunkAPI.rejectWithValue("An Unknown Error Occurred");
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async (userData: userType, thunkAPI) => {
  try {
    const response = await axiosInstance.put(`/api/users/update-user-data/${userData.id}`, userData);
    thunkAPI.dispatch(getUser());
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message || "Update User Failed");
    }
    return thunkAPI.rejectWithValue("An Unknown Error Occurred");
  }
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id: string, thunkAPI) => {
  try {
    const response = await axiosInstance.delete(`/api/users/delete-user-data/${id}`);
    thunkAPI.dispatch(getUser());
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return thunkAPI.rejectWithValue(error.message || "Delete User Failed");
    }
    return thunkAPI.rejectWithValue("An Unknown Error Occurred");
  }
});

export default userSlice.reducer;
