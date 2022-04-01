import axios from "axios";
import { getAccessToken } from "axios-jwt";

export const getSchools = () => {
  return {
    type: "GET_SCHOOLS",
    payload: axios.get("/school", {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};
