import axios from "axios";
import { getAccessToken } from "axios-jwt";

export const getQuizzesByDiff = () => {
  return {
    type: "QUIZZES_BY_DIFFICULTY",
    payload: axios.get(`/metrics/quizzesByDifficulty`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const getQuizzesByDiffPeriod = (start, end) => {
  return {
    type: "QUIZZES_BY_DIFFICULTY",
    payload: axios.get(
      `/metrics/quizzesByDifficultyAndPeriod?start=${start}&end=${end}`,
      {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      }
    ),
  };
};
