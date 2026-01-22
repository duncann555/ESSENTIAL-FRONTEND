import { useState, useEffect } from "react";
import { Container, Row, Col, Breadcrumb, Button, Badge } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Importamos SweetAlert para que quede lindo
import "../../styles/detalle.css";

// 1. IMPORTAMOS EL CONTEXTO DEL CARRITO
import { useCarrito } from "../../context/CarritoContext";

// TUS IMÁGENES
import valeriana from "../../assets/gotas/valeriana.jpg";
// ... (resto de tus imports de imágenes si los tenés)

// BASE DE DATOS MOCK (Mantenemos esto por ahora hasta que venga el Backend)
const productosData = [
  { id: 1, nombre: "Tintura Madre Valeriana", categoria: "Tinturas Madres", precio: 8500, stock: 15, descripcion: "Relajante natural, ayuda a conciliar el sueño.", imagen: valeriana },
  { id: 2, nombre: "Tintura Madre Pasionaria", categoria: "Tinturas Madres", precio: 8500, stock: 12, descripcion: "Sedante suave, ideal para estrés.", imagen: "https://placehold.co/600x600/png?text=Pasionaria" },
  { id: 3, nombre: "Tintura Madre Nerviol", categoria: "Tinturas Madres", precio: 8500, stock: 8, descripcion: "Combinación para nervios fuertes.", imagen: "https://placehold.co/600x600/png?text=Nerviol" },
  { id: 4, nombre: "Tintura Madre Diente de León", categoria: "Tinturas Madres", precio: 8500, stock: 20, descripcion: "Depurativo hepático natural.", imagen: "https://placehold.co/600x600/png?text=Diente" },
];

const DetalleProducto = () => {
  const { id } = useParams();
  
  // 2. TRAEMOS LA FUNCIÓN AGREGAR
  const { agregarAlCarrito } = useCarrito();

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const encontrado = productosData.find(p => p.id === parseInt(id));
    setProducto(encontrado || productosData[0]);
    setCantidad(1);
  }, [id]);

  if (!producto) return <div className="text-center py-5">Cargando producto...</div>;

  const handleRestar = () => { if (cantidad > 1) setCantidad(cantidad - 1); };
  const handleSumar = () => { if (cantidad < producto.stock) setCantidad(cantidad + 1); };

  // 3. FUNCIÓN REAL PARA AGREGAR
  const handleAgregarAlCarrito = () => {
    // Como nuestro contexto suma de a 1, hacemos un loop simple (solución rápida)
    // O idealmente modificamos el contexto para aceptar cantidad.
    // Por ahora, esto funciona perfecto:
    for (let i = 0; i < cantidad; i++) {
        agregarAlCarrito(producto);
    }

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Agregaste ${cantidad} ${producto.nombre}`,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        background: "#f0fdf4", // Color verdecito suave
        color: "#166534"
    });
  };

  return (
    <div className="page-wrapper py-4 py-md-5">
      <Container>
        {/* BREADCRUMB */}
        <Breadcrumb className="custom-breadcrumb mb-4 d-none d-md-block">
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Inicio</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/productos" }}>Productos</Breadcrumb.Item>
          <Breadcrumb.Item active>{producto.nombre}</Breadcrumb.Item>
        </Breadcrumb>

        <div className="d-md-none mb-3">
            <Link to="/productos" className="text-decoration-none text-muted fw-bold">
                <i className="bi bi-arrow-left me-2"></i>Volver
            </Link>
        </div>

        <Row className="g-4 g-lg-5 align-items-start">
          
          {/* COLUMNA IMAGEN */}
          <Col xs={12} lg={6} className="mb-3 mb-lg-0">
            <div className="detalle-img-container shadow-sm position-relative">
               <img
                src={producto.imagen}
                alt={producto.nombre}
                className="img-fluid object-fit-contain"
                onError={(e) => e.target.src = "https://placehold.co/600x600/png?text=Sin+Imagen"}
              />
            </div>
          </Col>

          {/* COLUMNA INFO */}
          <Col xs={12} lg={6}>
            <div className="detalle-info h-100 d-flex flex-column justify-content-center">
              
              <div>
                <Badge bg="success" className="mb-3 text-uppercase ls-1 px-3 py-2 rounded-pill">
                    {producto.categoria}
                </Badge>
                
                <h1 className="fw-bold display-5 text-dark font-playfair mb-2">
                    {producto.nombre}
                </h1>

                <div className="precio-container mb-4">
                    <span className="precio-main">
                    ${producto.precio.toLocaleString("es-AR")}
                    </span>
                </div>

                <p className="detalle-desc mb-4 fs-6">
                    {producto.descripcion}
                </p>
              </div>

              {/* CONTROLES */}
              <div className="compra-actions p-3 p-md-0 rounded-3 bg-light bg-md-transparent border border-md-0 mb-4 mb-md-5">
                <div className="d-flex flex-column flex-sm-row gap-3">
                    <div className="cantidad-selector d-flex align-items-center justify-content-between w-100 w-sm-auto">
                        <button onClick={handleRestar} className="btn-qty" disabled={cantidad <= 1}>−</button>
                        <span className="fw-bold">{cantidad}</span>
                        <button onClick={handleSumar} className="btn-qty" disabled={cantidad >= producto.stock}>+</button>
                    </div>

                    <Button 
                        className="btn-add-cart w-100 rounded-3 fw-bold py-2 py-md-3"
                        onClick={handleAgregarAlCarrito} 
                    >
                        <i className="bi bi-bag-plus-fill me-2"></i> Agregar al carrito
                    </Button>
                </div>
                <div className="text-center mt-2 d-md-none">
                    <small className="text-muted">Stock disponible: {producto.stock}</small>
                </div>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetalleProducto;