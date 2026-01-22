import { BrowserRouter, Routes, Route } from "react-router-dom";

import FloatingButtons from "./components/shared/FloatingButtons"; // Importalo

// 1. IMPORTAMOS LOS CONTEXTOS (LOS PARAGUAS)
import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";

// TUS COMPONENTES
import Menu from "./components/shared/Menu.jsx";
import Footer from "./components/shared/Footer.jsx";
import Admin from "./components/pages/Admin.jsx";
import Inicio from "./components/pages/Inicio.jsx";
import Carrito from "./components/pages/Carrito.jsx";
import Register from "./components/pages/Register.jsx";
import Nosotros from "./components/pages/Nosotros.jsx";
import Contacto from "./components/pages/Contacto.jsx";
import DetalleProducto from "./components/pages/DetalleProducto.jsx";
import Error404 from "./components/pages/Error404.jsx";
import Productos from "./components/pages/Productos.jsx";
import ProtectorAdmin from "./components/routes/ProtectorAdmin.jsx";

function App() {
  return (
    <BrowserRouter>
      {/* 2. ENVOLVEMOS TODO CON LOS PROVEEDORES */}
      <AuthProvider>
        <CarritoProvider>
          {/* EL MENÚ AHORA ESTÁ "ADENTRO" DEL CONTEXTO Y YA NO DARÁ ERROR */}
          <Menu />
          <main>
            <Routes>
              <Route path="/" element={<Inicio />} />

              {/* Rutas Protegidas */}
              <Route element={<ProtectorAdmin />}>
                <Route path="/admin" element={<Admin />} />
              </Route>

              <Route path="/carrito" element={<Carrito />} />
              <Route path="/register" element={<Register />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
          </main>
          <FloatingButtons /> {/* <--- ACÁ VA, VISIBLE SIEMPRE */}
          <Footer />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
