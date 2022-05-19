import axios from "axios";
import { config } from "../../config/Api.config";

export const getSchools = () => {
  return {
    type: "GET_SCHOOLS",
    payload: axios.get("/school", config()),
  };
};
