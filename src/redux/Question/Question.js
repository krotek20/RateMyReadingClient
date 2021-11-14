import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeQuestions: [],
};

export const questionsSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.activeQuestions.push(action.payload);
    },
    updateQuestion: (state, action) => {
      let i = state.activeQuestions.findIndex(
        (x) => x.id === action.payload.id
      );
      state.activeQuestions[i] = action.payload;
    },
    removeQuestion: (state, action) => {
      let i = state.activeQuestions.findIndex((x) => x.id === action.payload);
      state.activeQuestions.splice(i, 1);
    },
    removeAll: (state) => {
      state.activeQuestions = [];
    },
  },
});

export const { addQuestion, updateQuestion, removeQuestion, removeAll } =
  questionsSlice.actions;

export default questionsSlice.reducer;
