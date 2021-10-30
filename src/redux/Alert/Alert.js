import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: [],
};

export const AlertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    add: (state, action) => {
      state.alerts.push(action.payload);
    },
    remove: (state, action) => {
      const index = state.alerts.findIndex(
        (alert) => alert.id === action.payload.id
      );
      if (index > -1) {
        state.alerts.splice(index, 1);
      }
    },
  },
});

export const { add, remove } = AlertSlice.actions;

export default AlertSlice.reducer;
