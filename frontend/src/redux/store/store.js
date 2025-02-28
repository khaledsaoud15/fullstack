import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../auth/authSlice";
import userSlice from "../user/userSlice";
import userStatsSlice from "../user/userStatsSlice";
import productSlice from "../product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    stats: userStatsSlice,
    product: productSlice,
  },
});
