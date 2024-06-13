// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/product";
import authReducer from "./reducer/auth";
import adminReducer from "./reducer/admin"; // Import adminReducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    admin: adminReducer,
  },
});

export default store;
