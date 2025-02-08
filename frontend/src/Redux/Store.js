import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice.js"; // Ensure you have an auth slice

const store = configureStore({
  reducer: {
    auth: authReducer, // Ensure authReducer is correctly set up
  },
});

export default store;
