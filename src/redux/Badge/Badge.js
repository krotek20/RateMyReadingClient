import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  noOfDeniedQuestions: 0,
  noOfUnapprovedQuestions: 0,
};

export const badgesSlice = createSlice({
  name: "badge",
  initialState,
  reducers: {
    setDeniedQuestions: (state, action) => {
      state.noOfDeniedQuestions = action.payload;
    },
    setUnapprovedQuestions: (state, action) => {
      state.noOfUnapprovedQuestions = action.payload;
    },
    incremenetDeniedQuestions: (state) => {
      state.noOfDeniedQuestions += 1;
    },
    incremenetUnapprovedQuestions: (state) => {
      state.noOfUnapprovedQuestions += 1;
    },
    decrementDeniedQuestions: (state) => {
      state.noOfDeniedQuestions -= 1;
    },
    decrementUnapprovedQuestions: (state) => {
      state.noOfUnapprovedQuestions -= 1;
    },
  },
});

export const {
  decrementDeniedQuestions,
  decrementUnapprovedQuestions,
  incremenetDeniedQuestions,
  incremenetUnapprovedQuestions,
  setDeniedQuestions,
  setUnapprovedQuestions,
} = badgesSlice.actions;

export default badgesSlice.reducer;
