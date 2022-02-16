import { getAccessToken } from "axios-jwt";

export const config = () => {
  return { headers: { Authorization: `Bearer ${getAccessToken()}` } };
};
