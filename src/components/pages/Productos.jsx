import { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Badge,
  Offcanvas,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/productos.css";

// IMPORTAMOS EL CONTEXTO DEL CARRITO
import { useCarrito } from "../../context/CarritoContext";

// CONFIGURACIÓN API
const URL_API = "http://localhost:4000/api/productos";

const IMG_PLACEHOLDER = (text) =>
  `https://placehold.co/800x800/png?text=${encodeURIComponent(text || "Sin Imagen")}`;

// --- COMPONENTES AUXILIARES ---

function SidebarContent({ categorias, categoriaActiva, setCategoriaActiva, onSelect }) {
  const handleSelect = (nombre) => {
    setCategoriaActiva(nombre);
    if (onSelect) onSelect();
  };

  return (
    <ListGroup variant="flush" className="bg-transparent">
      <ListGroup.Item
        action
        active={categoriaActiva === "todas"}
        onClick={() => handleSelect("todas")}
        className="border-0 rounded-3 mb-1 d-flex align-items-center gap-2 py-2 cursor-pointer"
        style={{ cursor: "pointer" }}
      >
        <i className="bi bi-grid-fill"></i> Ver todo
      </ListGroup.Item>

      {categorias.map((cat, index) => (
        <ListGroup.Item
          key={index}
          action
          active={categoriaActiva === cat}
          onClick={() => handleSelect(cat)}
          className="border-0 rounded-3 mb-1 d-flex align-items-center gap-2 py-2 cursor-pointer"
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-tag-fill"></i> {cat}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

function BannerCategoria({ texto }) {
  return (
    <div className="mb-4 pb-2 border-bottom border-light-subtle fade-in">
      <h2 className="display-6 fw-bold text-dark font-playfair">{texto}</h2>
      <div
        className="bg-success rounded-pill"
        style={{ width: "60px", height: "4px" }}
      ></div>
    </div>
  );
}

function CardProducto({ producto }) {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  // Usamos _id de Mongo
  const { _id, nombre, precio, imagenUrl, categoria } = producto;

  const precioFormateado = precio.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

  const handleAgregar = (e) => {
    e.stopPropagation();
    agregarAlCarrito(producto);
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: "#f0fdf4",
      color: "#166534"
    });
    Toast.fire({ icon: 'success', title: 'Agregado al carrito' });
  };

  return (
    <Card 
      className="h-100 border-0 shadow-sm hover-scale overflow-hidden cursor-pointer"
      onClick={() => navigate(`/producto/${_id}`)}
      style={{ cursor: "pointer" }}
    >
      <div 
        className="position-relative bg-white border-bottom d-flex align-items-center justify-content-center"
        style={{ width: "100%", aspectRatio: "1/1" }} 
      >
        <img
          src={imagenUrl || IMG_PLACEHOLDER(nombre)}
          alt={nombre}
          loading="lazy"
          className="card-img-top" 
          style={{
            maxHeight: "85%",
            maxWidth: "85%",
            objectFit: "contain",
            width: "auto",
            height: "auto"
          }}
          onError={(e) => {
             e.target.onerror = null; 
             e.target.src = IMG_PLACEHOLDER(nombre); 
          }}
        />

        <Badge
          bg="light"
          text="dark"
          className="position-absolute bottom-0 start-0 rounded-0 rounded-top-end shadow-sm text-uppercase fw-bold border"
        >
          {categoria}
        </Badge>
      </div>

      <Card.Body className="d-flex flex-column text-center p-3 bg-white">
        <Card.Title
          className="fs-6 fw-semibold text-dark mb-1 text-truncate"
          title={nombre}
        >
          {nombre}
        </Card.Title>

        <Card.Text className="text-muted small mb-3">
          Presentación 50 ml
        </Card.Text>

        <div className="fs-4 fw-bold text-success mb-3">{precioFormateado}</div>

        <Button
          variant="outline-success"
          className="mt-auto w-100 fw-medium"
          onClick={handleAgregar}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

// ================================
// COMPONENTE PRINCIPAL
// ================================
export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  // 1. CARGA DE DATOS REAL
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await fetch(URL_API);
      if (!response.ok) throw new Error("Error server");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 2. CATEGORÍAS DINÁMICAS
  const categorias = useMemo(() => {
    const nombres = productos.map(p => p.categoria);
    return [...new Set(nombres)].sort(); // Únicas y ordenadas alfabéticamente
  }, [productos]);

  // 3. FILTRADO
  const productosFiltrados =
    categoriaActiva === "todas"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  if (loading) return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-success" role="status"></div>
    </div>
  );

  return (
    <div className="bg-light min-vh-100 py-5">
      <Container>
        {/* HEADER MOBILE */}
        <div className="d-md-none mb-4">
          <div className="text-center mb-3">
            <h2 className="fw-bold text-success">Nuestros Productos</h2>
            <p className="text-muted">Explorá nuestro catálogo natural</p>
          </div>
          {/* Botón para abrir filtros en celular */}
          <Button
            variant="outline-success"
            className="w-100 d-flex align-items-center justify-content-center gap-2 shadow-sm"
            onClick={handleShowOffcanvas}
          >
            <i className="bi bi-funnel-fill"></i> Filtrar Productos
          </Button>
        </div>

        <Row>
          {/* SIDEBAR DESKTOP */}
          <Col md={3} lg={2} className="d-none d-md-block mb-4">
            <div className="sticky-top z-1" style={{ top: "100px" }}>
              <h6 className="mb-3 fw-bold text-uppercase text-muted small px-2">
                Filtrar por
              </h6>
              <SidebarContent
                categorias={categorias}
                categoriaActiva={categoriaActiva}
                setCategoriaActiva={setCategoriaActiva}
              />
            </div>
          </Col>

          {/* GRILLA PRODUCTOS */}
          <Col xs={12} md={9} lg={10}>
            <div className="mb-4 d-none d-md-block">
              <BannerCategoria
                texto={
                  categoriaActiva === "todas"
                    ? "Catálogo Completo"
                    : categoriaActiva
                }
              />
            </div>

            {productosFiltrados.length === 0 ? (
                <div className="text-center py-5 text-muted">
                    <h4>No se encontraron productos en esta categoría.</h4>
                </div>
            ) : (
                <Row className="g-3 g-md-4">
                {productosFiltrados.map((prod) => (
                    <Col xs={6} md={4} lg={3} key={prod._id}>
                        <CardProducto producto={prod} />
                    </Col>
                ))}
                </Row>
            )}
          </Col>
        </Row>

        {/* MENÚ LATERAL MOBILE (Offcanvas) */}
        <Offcanvas
          show={showOffcanvas}
          onHide={handleCloseOffcanvas}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fw-bold text-success">
              Filtrar por
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <SidebarContent
              categorias={categorias}
              categoriaActiva={categoriaActiva}
              setCategoriaActiva={setCategoriaActiva}
              onSelect={handleCloseOffcanvas}
            />
          </Offcanvas.Body>
        </Offcanvas>
      </Container>
    </div>
  );
}