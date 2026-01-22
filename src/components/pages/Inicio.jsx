import { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import "../../styles/inicio.css";

// IMPORTAMOS EL CONTEXTO DEL CARRITO
import { useCarrito } from "../../context/CarritoContext";

// IMÁGENES ESTÁTICAS (Solo para banners y ofertas fijas del carousel)
import carousel1 from "../../assets/carousel1.png";
import carousel2 from "../../assets/carousel2.png";
import carousel3 from "../../assets/carousel3.png";
import oferta1 from "../../assets/oferta1.jpg";
import oferta2 from "../../assets/oferta2.jpg";
import oferta3 from "../../assets/oferta3.jpg";

// ================================
// CONFIGURACIÓN API
// ================================
const URL_API = "http://localhost:4000/api/productos"; 

const IMG_PLACEHOLDER = (text) => 
  `https://placehold.co/800x800/png?text=${encodeURIComponent(text || "Sin Imagen")}`;

const BannerCategoria = ({ texto }) => <div className="categoria-banner">{texto}</div>;

// --- TARJETA DE PRODUCTO ---
const CardProducto = ({ producto }) => {
  const navigate = useNavigate();
  const { agregarAlCarrito } = useCarrito();
  // Usamos _id porque viene de Mongo
  const { _id, nombre, precio, imagenUrl, categoria, oferta } = producto; 

  const handleAgregar = (e) => {
    e.stopPropagation(); // Evita navegar al detalle si tocas el botón agregar
    agregarAlCarrito(producto);
    
    // Feedback visual
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
      className="h-100 border-0 shadow-sm rounded-4 producto-card cursor-pointer"
      onClick={() => navigate(`/producto/${_id}`)}
      style={{ cursor: "pointer" }}
    >
      <div className="producto-img-wrapper position-relative">
        {oferta && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-3 px-3 py-2 z-1 shadow-sm">OFERTA</span>
        )}
        <Card.Img
          src={imagenUrl || IMG_PLACEHOLDER(nombre)}
          alt={nombre}
          className="producto-img rounded-top-4"
          loading="lazy"
          onError={(e) => {
             e.target.onerror = null; 
             e.target.src = IMG_PLACEHOLDER(nombre); 
          }}
        />
        <span className="badge bg-dark bg-opacity-75 position-absolute bottom-0 start-0 m-2 z-1">{categoria}</span>
      </div>

      <Card.Body className="d-flex flex-column p-4">
        <Card.Title className="fs-6 fw-bold text-dark text-truncate mb-1">{nombre}</Card.Title>
        <Card.Text className="fw-bold fs-5 text-success mb-3">
          {new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(precio)}
        </Card.Text>
        
        <div className="mt-auto d-flex gap-2">
            <Button 
                variant="outline-secondary" 
                className="rounded-pill w-50 fw-semibold btn-sm"
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/producto/${_id}`)
                }}
            >
                Ver
            </Button>
            <Button 
                variant="success" 
                className="rounded-pill w-100 fw-semibold btn-sm d-flex align-items-center justify-content-center gap-2"
                onClick={handleAgregar}
            >
                <i className="bi bi-cart-plus"></i> Agregar
            </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

// ================================
// INICIO PRINCIPAL
// ================================
export default function Inicio() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. CARGA REAL DE DATOS DESDE EL BACKEND
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const response = await fetch(URL_API);
      if (!response.ok) {
        throw new Error("No se pudo conectar al servidor");
      }
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
      // Acá no cargamos nada ficticio, dejamos que la UI maneje el estado vacío
    } finally {
      setLoading(false);
    }
  };

  // 2. CÁLCULO DINÁMICO DE CATEGORÍAS
  // Extraemos las categorías únicas de los productos que llegaron de la API
  const categorias = useMemo(() => {
    const nombresCategorias = productos.map(p => p.categoria);
    const unicas = [...new Set(nombresCategorias)]; // Elimina duplicados
    // Creamos objetos simples { id: index, nombre: "..." } para iterar fácil
    return unicas.map((nombre, index) => ({ id: index, nombre }));
  }, [productos]);

  // Filtramos ofertas (asumiendo que el back devuelve un boolean 'oferta')
  const ofertas = productos.filter((p) => p.oferta === true); 

  // 3. LÓGICA DE DESTACADOS (Primer producto de cada categoría)
  const masVendidoPorCategoria = useMemo(() => {
    const map = {};
    categorias.forEach((c) => {
      const top = productos.find((p) => p.categoria === c.nombre);
      if (top) map[c.nombre] = top;
    });
    return map;
  }, [categorias, productos]);

  if (loading) return <div className="text-center py-5 mt-5">
      <div className="spinner-border text-success" role="status"></div>
      <p className="mt-2 text-muted">Conectando con la naturaleza...</p>
  </div>;

  return (
    <div className="inicio-wrapper" style={{ overflowX: "hidden", position: "relative" }}>
      
      {/* HERO CAROUSEL */}
      <Container fluid className="py-3 bg-light px-0 px-md-3">
        <Carousel fade controls className="mx-auto" style={{ maxWidth: 1400 }}>
          {[carousel1, carousel2, carousel3].map((img, i) => (
            <Carousel.Item key={i}>
                <div className="ratio ratio-16x9">
                    <img src={img} alt={`Banner ${i}`} className="w-100 rounded-0 rounded-md-4 object-fit-cover" />
                </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* TEXTO BIENVENIDA */}
      <Container className="py-4 text-center">
        <h1 className="fw-bold text-success text-uppercase display-6 mb-2">Bienvenidos a ESSENZIA</h1>
        <p className="text-muted fs-5">Salud natural, consciente y artesanal</p>
      </Container>

      {/* DESTACADOS POR CATEGORÍA (DINÁMICO) */}
      <Container>
        {/* Si no hay productos, mostramos un mensaje amigable en lugar de error */}
        {categorias.length === 0 && !loading && (
            <div className="text-center py-5 text-muted">
                <i className="bi bi-basket display-1 d-block mb-3 opacity-25"></i>
                <p>No se encontraron productos disponibles por el momento.</p>
            </div>
        )}

        {categorias.map((cat) => {
          const prod = masVendidoPorCategoria[cat.nombre];
          if (!prod) return null; 

          return (
            <section key={cat.id} className="mb-5 text-center">
              <BannerCategoria texto={`Destacados en ${cat.nombre}`} />
              <Row className="justify-content-center mt-4">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <CardProducto producto={prod} />
                </Col>
              </Row>
            </section>
          );
        })}
      </Container>

      {/* BENEFICIOS */}
      <section className="beneficios-wrapper">
        <Container>
          <Row className="gy-4 py-4">
            <Col xs={12} md={4} className="beneficio-item d-flex align-items-center justify-content-center gap-3">
              <i className="bi bi-credit-card-2-back text-success fs-1"></i>
              <div className="text-start"><h6 className="fw-bold m-0">Hasta 12 cuotas</h6><small className="text-muted">Tarjetas bancarizadas</small></div>
            </Col>
            <Col xs={12} md={4} className="beneficio-item d-flex align-items-center justify-content-center gap-3">
              <i className="bi bi-truck text-success fs-1"></i>
              <div className="text-start"><h6 className="fw-bold m-0">Envíos a todo el país</h6><small className="text-muted">Seguimiento online</small></div>
            </Col>
            <Col xs={12} md={4} className="beneficio-item d-flex align-items-center justify-content-center gap-3">
              <i className="bi bi-flower2 text-success fs-1"></i>
              <div className="text-start"><h6 className="fw-bold m-0">100% Natural</h6><small className="text-muted">Sin aditivos químicos</small></div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* OFERTA INDIVIDUAL (BANNER ESTATICO) */}
      <Container className="d-flex justify-content-center py-4">
        <img src={oferta2} alt="Oferta Envío Gratis" className="img-fluid rounded-4 shadow-sm w-100" style={{ maxWidth: "500px" }} />
      </Container>

      {/* SECCIÓN OFERTAS (DINÁMICA) */}
      <Container className="py-5 pb-5">
        <div className="d-flex justify-content-center mb-4"><BannerCategoria texto="Ofertas Imperdibles" /></div>
        
        {/* Carrusel de Banners de Oferta (Imágenes estáticas) */}
        <div className="mb-5 px-md-5">
          <Carousel interval={3000} className="main-carousel-ofertas mx-auto shadow-lg rounded-4 overflow-hidden">
            {[oferta1, oferta3].map((img, i) => (
              <Carousel.Item key={i}>
                <div className="ratio ratio-21x9" style={{ maxHeight: "350px" }}>
                  <img className="w-100 h-100 object-fit-cover" src={img} alt={`Oferta ${i + 1}`} />
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Grilla de Productos en Oferta (Desde la API) */}
        <Row className="g-4">
          {ofertas.length > 0 ? ofertas.map((prod) => (
            <Col xs={12} sm={6} md={4} lg={3} key={prod._id}>
                <CardProducto producto={prod} />
            </Col>
          )) : (
            <div className="text-center text-muted w-100 py-4 bg-light rounded-3">
                <small>No hay ofertas activas en este momento.</small>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}