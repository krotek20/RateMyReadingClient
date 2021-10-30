import { configureStore } from "@reduxjs/toolkit";
import AlertReducer from "./Alert/Alert";

export const store = configureStore({
  reducer: {
    alert: AlertReducer,
  },
});
