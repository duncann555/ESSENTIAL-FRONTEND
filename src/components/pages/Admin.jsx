import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Swal from "sweetalert2";

import { useAuth } from "../../context/AuthContext";

import UsuarioModal from "./administrador/UsuarioModal";
import AdminStatus from "./administrador/AdminStatus";
import ProductosTab from "./administrador/ProductosTab";
import UsuariosTab from "./administrador/UsuariosTab";
import ProductoModal from "./administrador/ProductosModal";
import PedidosTab from "./administrador/PedidosTab";

import "../../styles/admin.css";

const API_URL = import.meta.env.VITE_API_URL;

const PRODUCTO_VACIO = {
  nombre: "",
  categoria: "",
  stock: "",
  descripcion: "",
  precio: "",
  imagenUrl: "",
};

function Admin() {
  // 1. OBTENEMOS USUARIO Y TOKEN DEL CONTEXTO
  const { user, token } = useAuth(); // <--- Aquí ya viene el token
  const esAdmin = user?.rol === "Administrador";

  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const [showProdModal, setShowProdModal] = useState(false);
  const [modoProducto, setModoProducto] = useState("crear");
  const [productoSeleccionadoId, setProductoSeleccionadoId] = useState(null);
  const [productoForm, setProductoForm] = useState(PRODUCTO_VACIO);

  // =========================
  // CARGA DE DATOS
  // =========================
  useEffect(() => {
    if (token && esAdmin) {
      cargarDatos();
    }
  }, [token, esAdmin]);

  const cargarDatos = async () => {
    try {
      // PRODUCTOS (Suele ser público, pero lo aseguramos)
      const resProd = await fetch(`${API_URL}/productos`);
      if (resProd.ok) setProductos(await resProd.json());

      // USUARIOS (Requiere Token)
      const resUser = await fetch(`${API_URL}/usuarios`, {
        headers: { "x-token": token }, // <--- Usamos el token real
      });

      if (resUser.ok) {
        setUsuarios(await resUser.json());
      } 
      // Si falla usuarios, no cortamos todo, solo logueamos
    } catch (error) {
      console.error("Error cargando datos:", error);
      Swal.fire("Error de conexión", "No se pudieron cargar todos los datos", "error");
    }
  };

  // =========================
  // PRODUCTOS LÓGICA
  // =========================
  const abrirModalProductoCrear = () => {
    setModoProducto("crear");
    setProductoSeleccionadoId(null);
    setProductoForm(PRODUCTO_VACIO);
    setShowProdModal(true);
  };

  const abrirModalProductoEditar = (prod) => {
    setModoProducto("editar");
    setProductoSeleccionadoId(prod._id);
    setProductoForm(prod);
    setShowProdModal(true);
  };

  const handleGuardarProducto = async (formData) => {
    try {
      let url = `${API_URL}/productos`;
      let method = "POST";

      if (modoProducto === "editar") {
        url = `${API_URL}/productos/${productoSeleccionadoId}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method: method,
        headers: {
          "x-token": token, // 🔐 TOKEN CLAVE AQUÍ
        },
        body: formData, // FormData viaja sin Content-Type manual (el navegador lo pone)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.mensaje || "Error al guardar producto");
      }

      await cargarDatos();
      setShowProdModal(false);
      Swal.fire("Éxito", `Producto ${modoProducto === 'crear' ? 'creado' : 'editado'} correctamente`, "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleEliminarProducto = async (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esto",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await fetch(`${API_URL}/productos/${id}`, {
                    method: "DELETE",
                    headers: { "x-token": token }, // 🔐 TOKEN CLAVE AQUÍ
                });

                if (!res.ok) throw new Error("No autorizado o error al borrar");

                await cargarDatos();
                Swal.fire("Eliminado", "Producto eliminado", "success");
            } catch (error) {
                Swal.fire("Error", error.message, "error");
            }
        }
    })
  };

  return (
    <Container fluid className="py-5 px-lg-5">
      <h2 className="fw-bold mb-4">Panel de Administración</h2>

      <AdminStatus
        totalProductos={productos.length}
        productosSinStock={productos.filter((p) => p.stock === 0).length}
        totalUsuarios={usuarios.length}
      />

      <Tabs defaultActiveKey="productos" className="mb-4">
        <Tab eventKey="productos" title="Inventario">
          <ProductosTab
            productos={productos}
            abrirModalProductoCrear={abrirModalProductoCrear}
            abrirModalProductoEditar={abrirModalProductoEditar}
            handleEliminarProducto={handleEliminarProducto}
            // Pasamos funciones de formato
            obtenerColorBadgeStock={(stock) => stock > 10 ? 'success' : stock > 0 ? 'warning' : 'danger'}
            formatearPrecio={(precio) => `$${precio}`}
          />
        </Tab>

        <Tab eventKey="usuarios" title="Usuarios">
          <UsuariosTab usuarios={usuarios} />
        </Tab>

        <Tab eventKey="pedidos" title="Pedidos">
          <PedidosTab pedidos={pedidos} />
        </Tab>
      </Tabs>

      <ProductoModal
        show={showProdModal}
        modoProducto={modoProducto}
        productoInicial={productoForm}
        cerrarModalProducto={() => setShowProdModal(false)}
        handleGuardarProducto={handleGuardarProducto}
      />

      <UsuarioModal show={false} />
    </Container>
  );
}

export default Admin;