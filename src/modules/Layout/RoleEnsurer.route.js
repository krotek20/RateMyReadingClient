import { getAccessToken } from "axios-jwt";
import { Navigate, useLocation } from "react-router-dom";
import { useDecode } from "../../hooks/useDecode";

const RoleEnsurer = ({ children, roles }) => {
  const location = useLocation();
  const decode = useDecode();

  if (getAccessToken() === undefined) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const user = decode();
  const userHasRequiredRole = user && roles.includes(user.roles[0]);

  if (!userHasRequiredRole) {
    return <Navigate to="/superadmin" />;
  }

  return children;
};

export default RoleEnsurer;
