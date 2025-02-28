import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSignInStats = createAsyncThunk(
  "users/fetchSignInStats",
  async () => {
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/auth/stats",
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    return data;
  }
);

const userStatsSlice = createSlice({
  name: "userStats",
  initialState: {
    daily: [],
    monthly: [],
    yearly: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignInStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSignInStats.fulfilled, (state, action) => {
        state.loading = false;
        state.daily = action.payload.daily;
        state.monthly = action.payload.monthly;
        state.yearly = action.payload.yearly;
      })
      .addCase(fetchSignInStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userStatsSlice.reducer;
