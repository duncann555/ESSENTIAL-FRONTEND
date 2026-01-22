import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Swal from "sweetalert2";

// Importación de componentes hijos
import UsuarioModal from "./administrador/UsuarioModal";
import AdminStatus from "./administrador/AdminStatus";
import ProductosTab from "./administrador/ProductosTab";
import UsuariosTab from "./administrador/UsuariosTab";
import ProductoModal from "./administrador/ProductosModal";
import PedidosTab from "./administrador/PedidosTab";
import PedidoModal from "./administrador/PedidosModal";
import "../../styles/admin.css";

// URL DEL BACKEND
const API_URL = "http://localhost:4000/api";

// OBJETO VACÍO PARA FORMULARIO
const PRODUCTO_VACIO = { nombre: "", categoria: "", stock: "", descripcion: "", precio: "", imagenUrl: "" };

function Admin() {
  // --- ESTADOS GLOBALES ---
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]); // Si tenés endpoint de pedidos, usalo acá

  // --- MODALES ---
  const [showProdModal, setShowProdModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showPedidoModal, setShowPedidoModal] = useState(false);

  // --- SELECCIONES ---
  const [modoProducto, setModoProducto] = useState("crear");
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null);
  const [productoForm, setProductoForm] = useState(PRODUCTO_VACIO);

  const [modoUsuario, setModoUsuario] = useState("crear");
  const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState(null);
  const [usuarioForm, setUsuarioForm] = useState({ nombre: "", email: "", rol: "", estado: "Activo" });

  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  // --- HELPER: Obtener Token para peticiones protegidas ---
  const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user_esenzia") || "{}");
    return {
      "Content-Type": "application/json",
      "x-token": user.token // Enviamos el token al backend
    };
  };

  // ==========================================
  // 1. CARGA INICIAL DE DATOS (READ)
  // ==========================================
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // Cargamos Productos (Público o Privado según tu back)
      const resProd = await fetch(`${API_URL}/productos`);
      if (resProd.ok) setProductos(await resProd.json());

      // Cargamos Usuarios (Protegido - Requiere Token)
      const resUser = await fetch(`${API_URL}/usuarios`, { headers: getAuthHeaders() });
      if (resUser.ok) setUsuarios(await resUser.json());

      // Cargamos Pedidos (Si tenés el endpoint listo)
      // const resPedidos = await fetch(`${API_URL}/pedidos`, { headers: getAuthHeaders() });
      // if (resPedidos.ok) setPedidos(await resPedidos.json());

    } catch (error) {
      console.error("Error cargando datos:", error);
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
  };

  // --- UTILIDADES ---
  const formatearPrecio = (p) => p.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
  const obtenerColorBadgeStock = (s) => (s === 0 ? "danger" : s <= 5 ? "warning" : "success");

  // =========================
  // LOGICA PRODUCTOS
  // =========================
  const abrirModalProductoCrear = () => {
    setModoProducto("crear");
    setProductoSeleccionadoId(null);
    setProductoForm(PRODUCTO_VACIO);
    setShowProdModal(true);
  };

  const abrirModalProductoEditar = (prod) => {
    setModoProducto("editar");
    setProductoSeleccionadoId(prod._id); // Usamos _id de Mongo
    setProductoForm({
      nombre: prod.nombre,
      categoria: prod.categoria,
      stock: prod.stock,
      descripcion: prod.descripcion,
      precio: prod.precio,
      imagenUrl: prod.imagenUrl,
    });
    setShowProdModal(true);
  };

  const handleGuardarProducto = async (data) => {
    try {
      const prodData = { ...data, precio: Number(data.precio), stock: Number(data.stock) };
      
      let url = `${API_URL}/productos`;
      let method = "POST";

      if (modoProducto === "editar") {
        url += `/${productoSeleccionadoId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(prodData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error al guardar");
      }

      await cargarDatos(); // Recargamos la tabla
      setShowProdModal(false);
      Swal.fire({ icon: "success", title: "Producto guardado", showConfirmButton: false, timer: 1500 });

    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleEliminarProducto = (id) => {
    Swal.fire({
      title: "¿Eliminar?", text: "No se puede deshacer.", icon: "warning",
      showCancelButton: true, confirmButtonColor: "#d33", confirmButtonText: "Sí, eliminar"
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/productos/${id}`, {
            method: "DELETE",
            headers: getAuthHeaders()
          });

          if (!response.ok) throw new Error("No se pudo eliminar");

          await cargarDatos();
          Swal.fire("Eliminado", "El producto fue borrado.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const handleSuspenderProducto = async (id) => {
    // Lógica opcional si tu backend soporta PATCH para estado
    // Por ahora lo dejamos visual o implementamos PATCH si el back lo tiene
    Swal.fire("Info", "Funcionalidad de suspender pendiente de Backend", "info");
  };

  // =========================
  // LOGICA USUARIOS (Similar a Productos pero para User)
  // =========================
  const abrirModalUsuarioEditar = (u) => {
    setModoUsuario("editar");
    setUsuarioSeleccionadoId(u._id);
    setUsuarioForm({ nombre: u.nombre, email: u.email, rol: u.rol, estado: u.estado });
    setShowUserModal(true);
  };

  const handleGuardarUsuario = async (data) => {
    // Implementar lógica similar a Productos (PUT /usuarios/:id)
    Swal.fire("Info", "Edición de usuarios en construcción", "info");
  };

  const handleEliminarUsuario = (id) => {
    Swal.fire({
      title: "¿Eliminar usuario?", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", confirmButtonText: "Eliminar"
    }).then(async (res) => {
      if (res.isConfirmed) {
        // Implementar DELETE /usuarios/:id
        Swal.fire("Info", "Borrado de usuarios en construcción", "info");
      }
    });
  };

  // =========================
  // RENDER
  // =========================
  return (
    <Container fluid className="py-5 px-lg-5">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark">Panel de Administración</h2>
        <span className="text-muted small">Esenzia v1.0 (Conectado)</span>
      </div>

      <AdminStatus
        totalProductos={productos.length}
        productosSinStock={productos.filter(p => p.stock === 0).length}
        totalUsuarios={usuarios.length}
      />

      <Tabs defaultActiveKey="productos" className="admin-tabs mb-4 border-bottom-0">
        <Tab eventKey="productos" title="Inventario">
          <ProductosTab
            productos={productos}
            abrirModalProductoCrear={abrirModalProductoCrear}
            abrirModalProductoEditar={abrirModalProductoEditar}
            handleEliminarProducto={handleEliminarProducto}
            handleSuspenderProducto={handleSuspenderProducto}
            obtenerColorBadgeStock={obtenerColorBadgeStock}
            formatearPrecio={formatearPrecio}
          />
        </Tab>

        <Tab eventKey="usuarios" title="Clientes">
          <UsuariosTab
            usuarios={usuarios}
            abrirModalUsuarioEditar={abrirModalUsuarioEditar}
            handleEliminarUsuario={handleEliminarUsuario}
            // handleSuspenderUsuario={handleSuspenderUsuario}
          />
        </Tab>
        
        {/* TAB PEDIDOS (Opcional si tenés el back listo) */}
        <Tab eventKey="pedidos" title="Pedidos">
           <PedidosTab 
             pedidos={pedidos} 
             // Pasar handlers cuando estén listos
             formatearPrecio={formatearPrecio}
           />
        </Tab>
      </Tabs>

      {/* MODALES */}
      <ProductoModal
        show={showProdModal}
        modoProducto={modoProducto}
        productoInicial={productoForm}
        cerrarModalProducto={() => setShowProdModal(false)}
        handleGuardarProducto={handleGuardarProducto}
      />

      <UsuarioModal
        show={showUserModal}
        modoUsuario={modoUsuario}
        usuarioForm={usuarioForm}
        handleChangeUsuario={() => {}} // react-hook-form lo maneja
        cerrarModalUsuario={() => setShowUserModal(false)}
        handleGuardarUsuario={handleGuardarUsuario}
      />

      {/* Modal Pedido si hace falta */}
    </Container>
  );
}

export default Admin;