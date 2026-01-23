import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectorAdmin() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.rol !== "Administrador") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectorAdmin;
