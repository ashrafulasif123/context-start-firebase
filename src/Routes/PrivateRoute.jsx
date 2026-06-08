import { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation()
  if (loading) {
    return (
      <div className="min-h-screen relative">
        <span className="loading loading-bars loading-xl absolute top-1/2 -translate-y-1/2"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate
    to="/login"
    state={{ from: location }}
    replace
  >

  </Navigate>;
};

export default PrivateRoute;
