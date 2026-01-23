import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import Inicio from "./components/pages/Inicio";
import Productos from "./components/pages/Productos";
import DetalleProducto from "./components/pages/DetalleProducto";
import Contacto from "./components/pages/Contacto";
import Carrito from "./components/pages/Carrito";
import Login from "./components/pages/Login"; // Ahora es página
import Register from "./components/pages/Register";
import Admin from "./components/pages/Admin"; // El panel
import Error404 from "./components/pages/Error404";
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext"; // Si no lo usás, borralo
import ProtectorAdmin from "./components/routes/ProtectorAdmin"; // El guardaespaldas
import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider> {/* Si da error, borrá esta línea y su cierre */}
          <Menu />
          <main>
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/" element={<Inicio />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<DetalleProducto />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* 🔐 Ruta Protegida de Admin */}
              <Route
                path="/admin"  /* <--- AQUI ESTABA LA CLAVE (debe ser /admin) */
                element={
                  <ProtectorAdmin>
                    <Admin />
                  </ProtectorAdmin>
                }
              />

              {/* Ruta de Error */}
              <Route path="*" element={<Error404 />} />
            </Routes>
          </main>
          <Footer />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;