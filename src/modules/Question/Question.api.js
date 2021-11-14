import axios from "axios";

export const getSavedQuestions = (bookId, userId) => {
  return {
    type: "GET_SAVED_QUESTIONS",
    payload: axios.get(
      `/question/savedQuestions?bookId=${bookId}&userId=${userId}`
    ),
  };
};

export const getQuestion = (questionId) => {
  return {
    type: "GET_QUESTION",
    payload: axios.get(`/question/byId?questionId=${questionId}`),
  };
};

export const createQuestion = (payload) => {
  return {
    type: "CREATE_QUESTION",
    payload: axios.post("/question", payload),
  };
};

export const deleteQuestion = (questionId) => {
  return {
    type: "DELETE_QUESTION",
    payload: axios.delete(`/question/byId?questionId=${questionId}`),
  };
};

export const updateQuestion = (payload) => {
  return {
    type: "UPDATE_QUESTION",
    payload: axios.post(`/question`, payload),
  };
};
