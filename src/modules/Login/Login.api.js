import axios from "axios";
import { getAccessToken } from "axios-jwt";

export const login = (params) => {
  return {
    type: "LOGIN",
    payload: axios.post("/login", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  };
};

export const getId = () => {
  return {
    type: "GET_ID",
    payload: axios.get("/id", {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};
