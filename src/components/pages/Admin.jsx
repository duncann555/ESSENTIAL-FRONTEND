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
const { user, token } = useAuth();
console.log("TOKEN ADMIN:", token);
console.log("ROL:", user?.rol);


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
      const resProd = await fetch(`${API_URL}/productos`);
      if (resProd.ok) setProductos(await resProd.json());

      const resUser = await fetch(`${API_URL}/usuarios`, {
        headers: { "x-token": token },
      });

      if (resUser.ok) {
        setUsuarios(await resUser.json());
      } else {
        throw new Error("No autorizado");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  // =========================
  // PRODUCTOS
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
      const res = await fetch(`${API_URL}/productos`, {
        method: "POST",
        headers: {
          "x-token": token, // 🔐 JWT real
        },
        body: formData, // 🔥 SE ENVÍA TAL CUAL
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.mensaje || "Acceso solo para administradores");
      }

      await cargarDatos();
      setShowProdModal(false);
      Swal.fire("Éxito", "Producto creado correctamente", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  const handleEliminarProducto = async (id) => {
    try {
      const res = await fetch(`${API_URL}/productos/${id}`, {
        method: "DELETE",
        headers: { "x-token": token },
      });

      if (!res.ok) throw new Error("No autorizado");

      await cargarDatos();
      Swal.fire("Eliminado", "Producto eliminado", "success");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  // =========================
  // RENDER
  // =========================
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
