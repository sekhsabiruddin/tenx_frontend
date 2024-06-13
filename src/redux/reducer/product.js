// src/store/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(`${server}/product/all-products`, {
      withCredentials: true,
    });
    return response.data;
  }
);

// Async thunk to create a product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData) => {
    const response = await axios.post(
      `${server}/product/create-product`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return response.data.product;
  }
);

// Async thunk to update a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ productId, formData }) => {
    try {
      const response = await axios.put(
        `${server}/product/update-product/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.updatedProduct; // Ensure this returns the updated product
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    const response = await axios.delete(
      `${server}/product/delete-product/${productId}`
    );
    return response.data.product; // Assuming your backend responds with the deleted product
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        debugger;
        const updatedProduct = action.payload; // Correctly access payload here
        const updatedIndex = state.items.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (updatedIndex !== -1) {
          state.items = state.items.map((product, index) =>
            index === updatedIndex ? updatedProduct : product
          );
        }
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (product) => product._id !== action.payload._id
        );
      });
  },
});

export default productSlice.reducer;
