import axios from "axios";

export const login = (params) => {
  return {
    type: "LOGIN",
    payload: axios.post("/login", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }),
  };
};
