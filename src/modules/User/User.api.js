import axios from "axios";
import { getAccessToken } from "axios-jwt";

export const register = (user, role, school) => {
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
        payload: axios.post(
          `/registerLocalAdmin`,
          { user, school },
          {
            headers: { Authorization: `Bearer ${getAccessToken()}` },
          }
        ),
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

export const studentBatchRegister = (users) => {
  return {
    type: "REGISTER_BATCH_STUDENTS",
    payload: axios.post("/registerStudentBatch", users, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const resetPassword = (body) => {
  return {
    type: "RESET_PASSWORD",
    payload: axios.post("/resetPassword", body, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: axios.post("/updateUser", user, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};

export const deductPoints = (username, points) => {
  return {
    type: "DEDUCT_POINTS",
    payload: axios.get(`/deductPoints?username=${username}&points=${points}`, {
      headers: { Authorization: `Bearer ${getAccessToken()}` },
    }),
  };
};
