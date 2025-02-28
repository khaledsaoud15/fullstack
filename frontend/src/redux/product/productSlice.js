import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  loading: false,
  error: null,
  message: null,
  products: [],
  product: null,
};

export const createProduct = createAsyncThunk(
  "/post/product",
  async (products, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/products/product",
        products,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "get/products",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/products");
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const fetchSingleProduct = createAsyncThunk(
  "get/product",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/products/product/${id}`
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "/update/product",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/products/product/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
        }
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
        state.message = "Product created successfully";
        state.error = null;
      })
      .addCase(createProduct.rejected, (state) => {
        state.loading = false;
        state.error = "Error creating product";
        state.message = null;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Updated succefully";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
