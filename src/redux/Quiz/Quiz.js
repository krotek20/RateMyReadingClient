import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  book: {},
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
    removeQuiz: () => {
      return { ...initialState };
    },
    updateAnswer: (state, action) => {
      const { questionId, correctAnswer } = action.payload;
      for (let i = 0; i < state.questions.length; i++) {
        if (state.questions[i].id === questionId) {
          state.questions[i].correctAnswer = correctAnswer;
          break;
        }
      }
    },
  },
});

export const { addQuiz, removeQuiz, updateAnswer } = quizSlice.actions;

export default quizSlice.reducer;
