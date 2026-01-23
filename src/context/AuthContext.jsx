import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null); // <--- 1. Agregamos estado para el token
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al cargar, leemos del localStorage
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
    const tokenGuardado = localStorage.getItem("token");

    if (usuarioGuardado && tokenGuardado) {
      setUsuario(usuarioGuardado);
      setToken(tokenGuardado); // <--- 2. Recuperamos el token al recargar
    }
    setLoading(false);
  }, []);

  const login = (userData, tokenRecibido) => {
    setUsuario(userData);
    setToken(tokenRecibido); // <--- 3. Guardamos el token en el estado
    localStorage.setItem("token", tokenRecibido);
    localStorage.setItem("usuario", JSON.stringify(userData));
  };

  const logout = () => {
    setUsuario(null);
    setToken(null); // <--- 4. Borramos el token del estado
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  return (
    // 5. ¡AQUI ESTÁ LA CLAVE! Agregamos 'token' al value para que Admin.jsx lo pueda usar
    <AuthContext.Provider value={{ usuario, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};