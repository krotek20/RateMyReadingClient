import axios from "axios";
import { getAccessToken } from "axios-jwt";

export const getSavedQuestions = (bookId, userId) => {
  return {
    type: "GET_SAVED_QUESTIONS",
    payload: axios.get(
      `/question/savedQuestions?bookId=${bookId}&userId=${userId}`,
      {
        headers: { Authorization: `Bearer ${getAccessToken()}` },
      }
    ),
  };
};

export const getQuestion = (questionId) => {
  return {
    type: "GET_QUESTION",
    payload: axios.get(`/question/byId?questionId=${questionId}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const createQuestion = (payload) => {
  return {
    type: "CREATE_QUESTION",
    payload: axios.post("/question", payload, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const deleteQuestion = (questionId) => {
  return {
    type: "DELETE_QUESTION",
    payload: axios.delete(`/question/byId?questionId=${questionId}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const updateQuestion = (payload) => {
  return {
    type: "UPDATE_QUESTION",
    payload: axios.post(`/question`, payload, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};