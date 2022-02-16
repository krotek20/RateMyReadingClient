import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizId: 0,
  startDate: "",
  endDate: "",
  points: 0,
  numberOfQuestions: 0,
  numberOfCorrectAnswers: 0,
  book: {},
};

export const quizResultSlice = createSlice({
  name: "quizResult",
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducers: {
    addQuizResult: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeQuizResult: () => {
      return { ...initialState };
    },
  },
});

export const { addQuizResult, removeQuizResult } = quizResultSlice.actions;

export default quizResultSlice.reducer;
