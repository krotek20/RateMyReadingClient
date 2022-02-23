import axios from "axios";
import { getAccessToken } from "axios-jwt";

export const register = (user, role) => {
  switch (role) {
    case "ROLE_STUDENT":
      return {
        type: "REGISTER_STUDENT",
        payload: axios.post(`/registerStudent`, user, {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        }),
      };
    case "ROLE_CONTRIBUTOR":
      return {
        type: "REGISTER_CONTRIBUTOR",
        payload: axios.post(`/registerContributor`, user, {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        }),
      };
    case "ROLE_PROFESSOR":
      return {
        type: "REGISTER_PROFESSOR",
        payload: axios.post(`/registerProfessor`, user, {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        }),
      };
    case "ROLE_LOCALADMIN":
      return {
        type: "REGISTER_LOCALADMIN",
        payload: axios.post(`/registerLocalAdmin`, user, {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        }),
      };
    default:
      return {
        type: "REGISTER_SUPERADMIN",
        payload: axios.post(`/registerSuperAdmin`, user, {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        }),
      };
  }
};
