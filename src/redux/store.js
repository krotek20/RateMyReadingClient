import { configureStore } from "@reduxjs/toolkit";
import QuestionReducer from "./Question/Question";

export const store = configureStore({
  reducer: {
    question: QuestionReducer,
  },
});
