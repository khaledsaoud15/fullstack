import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signInWithGoogle } from "../../auth.firebase";

const initialState = {
  user: null,
  loading: false,
  error: false,
};

export const register = createAsyncThunk(
  "/auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/register",
        userData
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const login = createAsyncThunk(
  "/auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/login", {
        email,
        password,
      });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

export const loginInWithGoogle = createAsyncThunk(
  "/auth/googleAuth",
  async (_, { rejectWithValue }) => {
    try {
      const user = await signInWithGoogle();
      return user;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong";
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong";
        state.loading = false;
      })
      .addCase(loginInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(loginInWithGoogle.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong";
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
