import axios from "axios";
import { config } from "../../config/Api.config";

export const getBooks = () => {
  return {
    type: "GET_BOOKS",
    payload: axios.get("/book", config()),
  };
};

export const getBooksWithTries = () => {
  return {
    type: "GET_BOOKS_TRIES",
    payload: axios.get(`/book/getAllUser`, config()),
  };
};

export const getBook = (bookId) => {
  return {
    type: "GET_BOOK",
    payload: axios.get(`/book/byId?bookId=${bookId}`, config()),
  };
};

export const createBook = (payload) => {
  return {
    type: "CREATE_BOOK",
    payload: axios.post("/book", payload, config()),
  };
};

export const deleteBook = (bookId) => {
  return {
    type: "DELETE_BOOK",
    payload: axios.delete(`/book/byId?bookId=${bookId}`, config()),
  };
};
