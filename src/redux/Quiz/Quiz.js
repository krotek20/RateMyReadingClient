import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  bookId: 0,
  questions: [],
  startDate: "",
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducers: {
    addQuiz: (state, action) => {
      return { ...state, ...action.payload };
    },
    removeQuiz: (state) => {
      return { ...initialState };
    },
  },
});

export const { addQuiz, removeQuiz } = quizSlice.actions;

export default quizSlice.reducer;
