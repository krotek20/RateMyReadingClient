import { getAccessToken } from "axios-jwt";
import jwt from "jwt-decode";

export function useDecode() {
  const token = getAccessToken();

  function decode() {
    return jwt(token);
  }

  return decode;
}
