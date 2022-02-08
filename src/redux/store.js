import { configureStore } from "@reduxjs/toolkit";
import QuestionReducer from "./Question/Question";
import QuizReducer from "./Quiz/Quiz";

export const store = configureStore({
  reducer: {
    question: QuestionReducer,
    quiz: QuizReducer,
  },
});
