import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const currentBookSlice = createSlice({
  name: "currentBook",
  initialState,
  reducers: {
    setCurrentBook: (state, action) => {
      if (!action.payload) {
        return null;
      }
      return { ...state, ...action.payload };
    },
  },
});

export const { setCurrentBook } = currentBookSlice.actions;

export default currentBookSlice.reducer;
