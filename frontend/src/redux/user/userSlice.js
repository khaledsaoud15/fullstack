import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: storedUser,
  loading: false,
  error: null,
  success: null,
};

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log("Sending Data:", Object.fromEntries(formData.entries())); // Debug

      const { data } = await axios({
        method: "PUT",
        url: `http://localhost:5000/api/v1/user/update/${id}`,
        data: formData,
        headers: {
          "x-auth-token": token,
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.success = "updated successfully";
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
