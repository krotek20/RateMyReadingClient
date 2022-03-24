import axios from "axios";
import { getAccessToken } from "axios-jwt";

export const getBooks = () => {
  return {
    type: "GET_BOOKS",
    payload: axios.get("/book", {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const getBooksWithTries = (userId) => {
  return {
    type: "GET_BOOKS_TRIES",
    payload: axios.get(`/book/getAllUser?userId=${userId}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const getBook = (bookId) => {
  return {
    type: "GET_BOOK",
    payload: axios.get(`/book/byId?bookId=${bookId}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const createBook = (payload) => {
  return {
    type: "CREATE_BOOK",
    payload: axios.post("/book", payload, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const deleteBook = (bookId) => {
  return {
    type: "DELETE_BOOK",
    payload: axios.delete(`/book/byId?bookId=${bookId}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};
