import { Navigate, Outlet } from "react-router-dom";

const ProtectorAdmin = () => {
  // 1. Buscamos si existe el token o usuario en el storage
  const token = localStorage.getItem("admin_token");

  // 2. Si no hay token, lo mandamos al inicio (o al login)
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 3. Si hay token, dejamos pasar a los componentes hijos (Outlet)
  return <Outlet />;
};

export default ProtectorAdmin;