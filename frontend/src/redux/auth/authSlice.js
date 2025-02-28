import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { signInWithGoogle } from "../../auth.firebase";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: storedUser,
  loading: false,
  error: null,
  token: JSON.parse(localStorage.getItem("token")) || null,
};

export const register = createAsyncThunk(
  "/auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.data);
    }
  }
);

export const login = createAsyncThunk(
  "/auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.accessToken));
      return data;
    } catch (err) {
      return rejectWithValue(err.data?.message);
    }
  }
);

export const loginInWithGoogle = createAsyncThunk(
  "/auth/googleAuth",
  async (_, { rejectWithValue }) => {
    try {
      const user = await signInWithGoogle();
      const idToken = await user.getIdToken();
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/google-login",
        { idToken }
      );

      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", JSON.stringify(data.accessToken));

      return data;
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
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong";
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || "Something went wrong";
        state.loading = false;
      })
      .addCase(loginInWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
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
