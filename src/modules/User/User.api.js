import axios from "axios";
import { config } from "../../config/Api.config";

export const register = (user, role, school) => {
  switch (role) {
    case "ROLE_STUDENT":
      return {
        type: "REGISTER_STUDENT",
        payload: axios.post(`/registerStudent`, user, config()),
      };
    case "ROLE_CONTRIBUTOR":
      return {
        type: "REGISTER_CONTRIBUTOR",
        payload: axios.post(`/registerContributor`, user, config()),
      };
    case "ROLE_PROFESSOR":
      return {
        type: "REGISTER_PROFESSOR",
        payload: axios.post(`/registerProfessor`, user, config()),
      };
    case "ROLE_LOCALADMIN":
      return {
        type: "REGISTER_LOCALADMIN",
        payload: axios.post(`/registerLocalAdmin`, { user, school }, config()),
      };
    default:
      return {
        type: "REGISTER_SUPERADMIN",
        payload: axios.post(`/registerSuperAdmin`, user, config()),
      };
  }
};

export const studentBatchRegister = (users) => {
  return {
    type: "REGISTER_BATCH_STUDENTS",
    payload: axios.post("/registerStudentBatch", users, config()),
  };
};

export const resetPassword = (body) => {
  return {
    type: "RESET_PASSWORD",
    payload: axios.post("/resetPassword", body, config()),
  };
};

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: axios.post("/updateUser", user, config()),
  };
};

export const deductPoints = (username, points) => {
  return {
    type: "DEDUCT_POINTS",
    payload: axios.get(
      `/deductPoints?username=${username}&points=${points}`,
      config()
    ),
  };
};

export const getMyPoints = () => {
  return {
    type: "GET_MY_POINTS",
    payload: axios.get("/myPoints", config()),
  };
};

export const getAllUsers = () => {
  return {
    type: "GET_ALL_USERS",
    payload: axios.get("/users", config()),
  };
};
