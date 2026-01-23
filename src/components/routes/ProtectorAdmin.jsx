import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectorAdmin = ({ children }) => {
  const { usuario, loading } = useContext(AuthContext);

  // Si está cargando, no hacemos nada todavía (para evitar parpadeos)
  if (loading) return null;

  // Si no hay usuario o no es admin, ¡afuera!
  if (!usuario || usuario.rol !== "Administrador") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectorAdmin;