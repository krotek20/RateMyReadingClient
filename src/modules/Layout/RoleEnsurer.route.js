import { getAccessToken } from "axios-jwt";
import { Navigate, useLocation } from "react-router-dom";
import { useDecode } from "../../hooks/useDecode";

const getPath = (role) => {
  if (role === "ROLE_STUDENT") return "/elev";
  if (role === "ROLE_CONTRIBUTOR") return "/contributor/intrebari";
  if (role === "ROLE_PROFESSOR") return "/teacher";
  if (role === "ROLE_LOCALADMIN") return "/localadmin";
  if (role === "ROLE_SUPERADMIN") return "/superadmin";
};

const RoleEnsurer = ({ children, roles }) => {
  const location = useLocation();
  const decode = useDecode();

  if (getAccessToken() === undefined) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const user = decode();
  const userHasRequiredRole = user && roles.includes(user.roles[0]);

  if (!userHasRequiredRole) {
    return <Navigate to={getPath(user.roles[0])} />;
  }

  return children;
};

export default RoleEnsurer;
