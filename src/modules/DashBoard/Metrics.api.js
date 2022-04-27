import axios from "axios";
import { config } from "../../config/Api.config";

export const getQuizzesByDiff = () => {
  return {
    type: "QUIZZES_BY_DIFFICULTY",
    payload: axios.get(`/metrics/quizzesByDifficulty`, config()),
  };
};

export const getQuizzesByDiffPeriod = (start, end) => {
  return {
    type: "QUIZZES_BY_DIFFICULTY_PERIOD",
    payload: axios.get(
      `/metrics/quizzesByDifficultyAndPeriod?start=${start}&end=${end}`,
      config()
    ),
  };
};

export const getActiveStudents = () => {
  return {
    type: "GET_ACTIVE_STUDENTS",
    payload: axios.get("/metrics/activeStudents", config()),
  };
};

export const getTotalStudents = () => {
  return {
    type: "GET_TOTAL_STUDENTS",
    payload: axios.get("/metrics/totalStudents", config()),
  };
};

export const getActiveStudentsByPeriod = (start, end) => {
  return {
    type: "GET_ACTIVE_STUDENTS_PERIOD",
    payload: axios.get(
      `/metrics/activeStudentsByPeriod?start=${start}&end=${end}`,
      config()
    ),
  };
};

export const getTotalSchools = () => {
  return {
    type: "GET_TOTAL_SCHOOLS",
    payload: axios.get("/schoolCount", config()),
  };
};

export const getActiveSchoolsByPeriod = (start, end) => {
  return {
    type: "GET_ACTIVE_SCHOOLS_PERIOD",
    payload: axios.get(
      `/metrics/activeSchoolsByPeriod?start=${start}&end=${end}`,
      config()
    ),
  };
};

export const getAvgPointsByDifficulty = () => {
  return {
    type: "GET_AVG_POINTS_BY_DIFF",
    payload: axios.get("/metrics/avgPointsByDifficulty", config()),
  };
};

export const getAvgPointsByDifficultyInPeriod = (start, end) => {
  return {
    type: "GET_AVG_POINTS_BY_DIFF_IN_PERIOD",
    payload: axios.get(
      `/metrics/avgPointsByDifficultyAndPeriod?start=${start}&end=${end}`,
      config()
    ),
  };
};

export const getTop50UsersInPeriod = (start, end) => {
  return {
    type: "GET_TOP_USERS_IN_PERIOD",
    payload: axios.get(
      `/metrics/top50UsersByPeriod?start=${start}&end=${end}`,
      config()
    ),
  };
};

export const getTop5SchoolsInPeriod = (start, end) => {
  return {
    type: "GET_TOP_SCHOOLS_IN_PERIOD",
    payload: axios.get(
      `/metrics/top5SchoolsByPeriod?start=${start}&end=${end}`,
      config()
    ),
  };
};

export const getTop25BooksInPeriod = (start, end) => {
  return {
    type: "GET_TOP_BOOKS_IN_PERIOD",
    payload: axios.get(
      `/metrics/top25BooksByPeriod?start=${start}&end=${end}`,
      config()
    ),
  };
};

export const getPointsByDiffInPeriod = (start, end) => {
  return {
    type: "GET_POINTS_BY_DIFF_IN_PERIOD",
    payload: axios.get(
      `/metrics/pointsByDifficultyAndPeriod?start=${start}&end=${end}`,
      config()
    ),
  };
};

export const getCorrectAnswerPercentage = () => {
  return {
    type: "GET_CORRECT_ANSWER_PERCENTAGE",
    payload: axios.get(
      "/metrics/correctAnswerPercentageByDifficulty",
      config()
    ),
  };
};

export const getSelfQuizCount = () => {
  return {
    type: "GET_SELF_QUIZ_COUNT",
    payload: axios.get("/metrics/selfQuizCount", config()),
  };
};

export const getSelfAnswersByDiff = () => {
  return {
    type: "GET_SELF_ANSWERS_BY_DIFFICULTY",
    payload: axios.get(
      "/metrics/selfCorrectAnswerPercentageByDifficulty",
      config()
    ),
  };
};

export const getSelfPointsInPeriod = (start, end) => {
  return {
    type: "GET_SELF_POINTS_IN_PERIOD",
    payload: axios.get(
      `/metrics/selfPointsByPeriod?start=${start}&end=${end}`,
      config()
    ),
  };
};

export const getSelfPointsDiffInPeriod = (start, end) => {
  return {
    type: "GET_SELF_POINTS_BY_DIFF_IN_PERIOD",
    payload: axios.get(
      `/metrics/selfPointsByDifficultyAndPeriod?start=${start}&end=${end}`,
      config()
    ),
  };
};

export const getSelfQuizCountDiff = () => {
  return {
    type: "GET_SELF_QUIZ_COUNT_BY_DIFFICULTY",
    payload: axios.get("/metrics/selfQuizCountByDifficulty", config()),
  };
};
