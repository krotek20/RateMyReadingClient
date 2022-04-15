import axios from "axios";
import { config } from "../../config/Api.config";

export const quizGeneration = (bookId, userId) => {
  return {
    type: "GENERATE_QUIZ",
    payload: axios.get(
      `/quiz/generate?bookId=${bookId}&userId=${userId}`,
      config()
    ),
  };
};

export const quizSubmit = (body) => {
  return {
    type: "SUBMIT_QUIZ",
    payload: axios.post("/quiz/submit", body, config()),
  };
};
