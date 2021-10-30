import axios from "axios";

export const getBooks = () => {
  return {
    type: "GET_BOOKS",
    payload: axios.get("/book"),
  };
};

export const getBook = (bookId) => {
  return {
    type: "GET_BOOK",
    payload: axios.get(`/book/byId?bookId=${bookId}`),
  };
};

export const createBook = (payload) => {
  return {
    type: "CREATE_BOOK",
    payload: axios.post("/book", payload),
  };
};

export const deleteBook = (bookId) => {
  return {
    type: "DELETE_BOOK",
    payload: axios.delete(`/book/byId?bookId=${bookId}`),
  };
};
