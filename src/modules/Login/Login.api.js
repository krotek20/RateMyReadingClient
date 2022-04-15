import axios from "axios";
import { config } from "../../config/Api.config";

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
    payload: axios.get("/id", config()),
  };
};

export const forgotPassword = (username) => {
  return {
    type: "FORGOT_PASSWORD",
    payload: axios.get(`/forgotPassword?username=${username}`),
  };
};

export const confirmForgotPassword = (username, key) => {
  return {
    type: "CONFIRM_FORGOT_PASSWORD",
    payload: axios.get(
      `/forgotPasswordConfirm?username=${username}&key=${key}`
    ),
  };
};
