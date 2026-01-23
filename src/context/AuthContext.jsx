import { createContext, useState, useEffect, useContext } from "react"; // <--- Agregá useContext aquí

export const AuthContext = createContext();

// 1. ESTO ES LO QUE TE FALTA: El Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al cargar, leemos del localStorage
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    const tokenGuardado = localStorage.getItem("token");

    if (usuarioGuardado && tokenGuardado) {
      setUsuario(usuarioGuardado);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUsuario(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(userData));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};