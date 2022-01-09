import { clearAuthTokens } from "axios-jwt";

export const logout = () => clearAuthTokens();
