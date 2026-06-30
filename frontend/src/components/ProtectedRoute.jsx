import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;