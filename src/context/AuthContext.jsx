import { createContext, useState, useEffect, useContext } from "react";

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos el proveedor
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("user_esenzia");
    if (usuarioGuardado) {
      setUser(JSON.parse(usuarioGuardado));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user_esenzia", JSON.stringify(userData));
    localStorage.setItem("admin_token", "true");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_esenzia");
    localStorage.removeItem("admin_token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
