import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  primary: "",
  secondary: "",
};

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    setColors: (state, action) => {
      if (!action.payload) {
        return null;
      }
      return { ...state, ...action.payload };
    },
  },
});

export const { setColors } = colorSlice.actions;

export default colorSlice.reducer;
