import { applyAuthTokenInterceptor, getAccessToken } from "axios-jwt";
// import axios from "axios";
// import baseURI from "./App.config";

// export const axiosInstance = axios.create({ baseURL: baseURI });

// const requestRefresh = (refresh) => {
//   return axios
//     .post(`${baseURI}login/refresh_token`, { refresh })
//     .then((response) => response.data.access_token);
// };

// applyAuthTokenInterceptor(axiosInstance, { requestRefresh });

// axiosInstance.get("/api/endpoint/that/requires/login").then((response) => {});

export const config = () => {
  return { headers: { Authorization: `Bearer ${getAccessToken()}` } };
};
