import axios from "axios";
import { config } from "../../config/Api.config";

export const getSavedQuestions = (bookId) => {
  return {
    type: "GET_SAVED_QUESTIONS",
    payload: axios.get(`/question/savedQuestions?bookId=${bookId}`, config()),
  };
};

export const getUnapprovedQuestions = () => {
  return {
    type: "GET_UNAPPROVED_QUESTIONS",
    payload: axios.get(`/question/unapprovedQuestions`, config()),
  };
};

export const getDeniedQuestions = () => {
  return {
    type: "GET_DENIED_QUESTIONS",
    payload: axios.get(`/question/deniedQuestions`, config()),
  };
};

export const getQuestion = (questionId) => {
  return {
    type: "GET_QUESTION",
    payload: axios.get(`/question/byId?questionId=${questionId}`, config()),
  };
};

export const createQuestion = (payload) => {
  return {
    type: "CREATE_QUESTION",
    payload: axios.post("/question", payload, config()),
  };
};

export const deleteQuestion = (questionId) => {
  return {
    type: "DELETE_QUESTION",
    payload: axios.delete(`/question/byId?questionId=${questionId}`, config()),
  };
};

export const updateQuestion = (payload) => {
  return {
    type: "UPDATE_QUESTION",
    payload: axios.post(`/question`, payload, config()),
  };
};
