import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "productSlice",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //Get All
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.products = action.payload;
    },
    //Delete
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    //Update
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
    },
    //add
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductError: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.products.push(action.payload);
    },
  },
});

export const {
  getProductError,
  getProductStart,
  getProductSuccess,
  deleteProductError,
  deleteProductStart,
  deleteProductSuccess,
  updateProductError,
  updateProductStart,
  updateProductSuccess,
  addProductError,
  addProductStart,
  addProductSuccess,
} = productSlice.actions;
export default productSlice.reducer;
