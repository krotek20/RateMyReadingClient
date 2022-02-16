import axios from "axios";
import { getAccessToken } from "axios-jwt";

export const quizGeneration = (bookId, userId) => {
  return {
    type: "GENERATE_QUIZ",
    payload: axios.get(`/quiz/generate?bookId=${bookId}&userId=${userId}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const quizSubmit = (body) => {
  return {
    type: "SUBMIT_QUIZ",
    payload: axios.post("/quiz/submit", body, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};
