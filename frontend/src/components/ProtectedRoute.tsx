import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
