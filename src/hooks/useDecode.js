import { getAccessToken } from "axios-jwt";
import jwt_decode from "jwt-decode";

export function useDecode() {
  const token = getAccessToken();

  function decode() {
    return jwt_decode(token);
  }

  return decode;
}
