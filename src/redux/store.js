import QuestionReducer from "./Question/Question";
import QuizReducer from "./Quiz/Quiz";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import QuizResultReducer from "./Quiz/QuizResult";
import BadgeReducer from "./Badge/Badge";
import CurrentBookReducer from "./Book/CurrentBook";
import ColorReducer from "./Color/Color";

const persistConfig = {
  timeout: 2000,
  key: "root",
  storage,
  whitelist: ["quiz"],
};

const reducers = combineReducers({
  question: QuestionReducer,
  quiz: persistReducer(persistConfig, QuizReducer),
  quizResult: QuizResultReducer,
  badge: BadgeReducer,
  currentBook: CurrentBookReducer,
  color: ColorReducer,
});

export const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
