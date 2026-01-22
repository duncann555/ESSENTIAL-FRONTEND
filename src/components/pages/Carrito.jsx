import { useMemo } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  ProgressBar
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/carrito.css";

// 1. IMPORTAMOS EL CONTEXTO
import { useCarrito } from "../../context/CarritoContext";

// ===============================
//  ITEM DEL CARRITO
// ===============================
function CarritoItem({
  item,
  // En lugar de pasar funciones por props, las usamos directo del contexto si queremos,
  // pero mantenerlas como props hace al componente más reutilizable. 
  // Para este caso, las pasaremos desde el padre que ya consume el contexto.
  onIncrementar,
  onDecrementar,
  onEliminar,
  formatearPrecio,
}) {
  return (
    <div className="carrito-item-row">
      {/* IMAGEN */}
      <div className="carrito-item-img-wrapper">
        <img
          src={item.imagenUrl || "https://placehold.co/150x150/png?text=Sin+Imagen"}
          alt={item.nombre}
          className="carrito-item-img"
          loading="lazy"
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/png?text=Error"; }}
        />
      </div>

      {/* INFO + CONTROLES */}
      <div className="carrito-item-info">
        <div>
          <small
            className="text-muted text-uppercase fw-bold"
            style={{ fontSize: "0.7rem" }}
          >
            {item.categoria}
          </small>
          <h6 className="carrito-item-name">{item.nombre}</h6>
        </div>

        <div className="d-flex align-items-center gap-3 mt-2">
          {/* Selector Cantidad */}
          <div className="carrito-qty-group d-flex align-items-center">
            <button
              className="btn-qty-mini"
              onClick={() => onDecrementar(item.id)} // OJO: Asegurate que tu contexto use 'id' o '_id'. Usualmente el contexto mapea.
              disabled={item.cantidad <= 1}
            >
              −
            </button>
            <span
              className="mx-2 fw-semibold"
              style={{ minWidth: "20px", textAlign: "center" }}
            >
              {item.cantidad}
            </span>
            <button
              className="btn-qty-mini"
              onClick={() => onIncrementar(item)} // Pasamos el item entero para agregar
            >
              +
            </button>
          </div>

          {/* Eliminar */}
          <button
            className="btn-trash"
            onClick={() => onEliminar(item.id)}
            title="Eliminar"
          >
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </div>

      {/* PRECIO FINAL */}
      <div className="carrito-item-price text-end">
        {formatearPrecio(item.precio * item.cantidad)}
      </div>
    </div>
  );
}

// ===============================
//  COMPONENTE PRINCIPAL
// ===============================
const Carrito = () => {
  const navigate = useNavigate();
  
  // 2. USAMOS EL CONTEXTO
  // Traemos todo lo necesario: el array 'carrito', y las funciones para modificarlo
  const { 
    carrito, 
    agregarAlCarrito, 
    eliminarDelCarrito, 
    vaciarCarrito,
    cantidadTotal 
  } = useCarrito();

  // Función auxiliar para restar cantidad (lógica local usando las funciones del contexto)
  // Como 'agregarAlCarrito' suma 1, necesitamos una para restar.
  // Si tu contexto solo tiene "agregar" y "eliminar todo", acá hacemos un truco:
  // Lo ideal sería que el contexto tenga "restarUno". 
  // Si no lo tiene, podés implementar 'eliminarDelCarrito' si llega a 1, o modificar el contexto.
  // ASUMIENDO QUE TU CONTEXTO TIENE LÓGICA BÁSICA:
  
  const handleIncrementar = (item) => {
    agregarAlCarrito(item); // Suma 1
  };

  const handleDecrementar = (id) => {
    // Esta lógica debería estar en el Contexto idealmente para ser global.
    // Si no tenés función "restar" en el contexto, por ahora dejaremos un aviso
    // o podés modificar CarritoContext.jsx para agregar `restarDelCarrito`.
    console.warn("Falta implementar restarDelCarrito en el Contexto");
    // Por ahora, si querés restar, tendrías que borrar y agregar n-1 veces (feo).
    // RECOMENDACIÓN: Agregá `restarDelCarrito` a tu Contexto.
  };
  
  // Como parche rápido para que no rompa si no modificaste el contexto:
  // Vamos a usar una función local que simula restar si tenés acceso al setCarrito, 
  // pero como no lo tenés expuesto, solo usaremos ELIMINAR por ahora si la cantidad es 1.
  
  /* IMPORTANTE: Para que los botones + y - funcionen perfecto,
     tu CarritoContext.jsx debería exportar una función `restarDelCarrito(id)`.
     Si no la tiene, el botón "-" no hará nada o dará error.
  */

  const formatearPrecio = (valor) =>
    valor.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    });

  // Calculamos el total monetario
  const total = useMemo(
    () => carrito.reduce((acc, item) => acc + item.cantidad * item.precio, 0),
    [carrito]
  );

  // --- LÓGICA DE BARRA DE PROGRESO ---
  const itemsParaEnvioGratis = 5; // O podés hacerlo por monto: const montoEnvioGratis = 50000;
  const faltanParaEnvio = Math.max(0, itemsParaEnvioGratis - cantidadTotal);
  const porcentajeEnvio = Math.min(100, (cantidadTotal / itemsParaEnvioGratis) * 100);

  return (
    <section className="page-wrapper py-4">
      <Container className="carrito-container">
        
        {/* HEADER */}
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="btn-back mb-2">
            <i className="bi bi-arrow-left me-2"></i>Seguir comprando
          </button>
          <h1 className="font-playfair fw-bold display-6">Tu Carrito</h1>
          <p className="text-muted">
            {cantidadTotal > 0
              ? `Tenés ${cantidadTotal} productos seleccionados para tu bienestar.`
              : "Tu carrito está vacío, ¡explorá nuestra tienda!"}
          </p>
        </div>

        {/* --- BARRA DE PROGRESO PROMOCIONAL --- */}
        {cantidadTotal > 0 && (
          <div className="mb-4 p-3 bg-white rounded-4 shadow-sm border border-light">
            {faltanParaEnvio > 0 ? (
              <>
                <p className="mb-2 fw-bold text-dark small">
                  ¡Agregá <span className="text-danger fw-bolder">{faltanParaEnvio} más</span> para tener <span className="text-success fw-bolder">ENVÍO GRATIS</span>! 🚛
                </p>
                <ProgressBar 
                  now={porcentajeEnvio} 
                  variant="success" 
                  style={{height: '8px', borderRadius: '50rem'}} 
                  animated 
                />
              </>
            ) : (
              <div className="d-flex align-items-center gap-2 text-success fw-bold">
                <i className="bi bi-check-circle-fill fs-5"></i>
                <span>¡Felicitaciones! Tenés ENVÍO GRATIS en este pedido.</span>
              </div>
            )}
          </div>
        )}

        <Row className="g-4">
          {/* LISTA DE PRODUCTOS */}
          <Col xs={12} lg={8}>
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
              <Card.Body className="p-0">
                {carrito.length === 0 ? (
                  <div className="text-center py-5 px-3">
                    <div
                      className="mb-3 text-muted opacity-25"
                      style={{ fontSize: "3rem" }}
                    >
                      <i className="bi bi-basket"></i>
                    </div>
                    <h5 className="fw-bold text-muted">
                      No hay productos aquí
                    </h5>
                    <Button
                      variant="success"
                      className="mt-3 rounded-pill px-4 btn-brand"
                      onClick={() => navigate("/productos")}
                    >
                      Ir a la Tienda
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="px-4 py-2">
                      {carrito.map((item) => (
                        <CarritoItem
                          key={item.id || item._id} // Usamos id o _id
                          item={item}
                          onIncrementar={() => agregarAlCarrito(item)}
                          // Para decrementar: Si no tenés función restar, podés pasar null o crearla en el contexto
                          onDecrementar={() => { 
                              // Lógica provisoria: si hay más de 1, idealmente restar. 
                              // Si no, eliminar.
                              if (item.cantidad === 1) eliminarDelCarrito(item.id);
                              else {
                                  // ACÁ DEBERÍAS LLAMAR A restarDelCarrito(item.id)
                                  console.log("Restar pendiente de implementación en Contexto");
                              }
                          }}
                          onEliminar={eliminarDelCarrito}
                          formatearPrecio={formatearPrecio}
                        />
                      ))}
                    </div>

                    <div className="d-flex justify-content-end my-4 me-4 pt-3 border-top">
                      <button
                        className="btn-empty"
                        onClick={vaciarCarrito}
                        title="Eliminar todos los productos"
                      >
                        <i className="bi bi-trash"></i> Vaciar carrito
                      </button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* RESUMEN DE COMPRA */}
          <Col xs={12} lg={4}>
            <Card className="border-0 shadow-sm rounded-4 bg-white">
              <Card.Body className="p-4">
                <h5 className="fw-bold font-playfair mb-4">
                  Resumen del pedido
                </h5>

                <div className="d-flex justify-content-between mb-2 text-muted">
                  <span>Subtotal</span>
                  <span>{formatearPrecio(total)}</span>
                </div>
                
                {/* Envío condicional en el resumen */}
                <div className="d-flex justify-content-between mb-3 text-muted">
                  <span>Envío</span>
                  {faltanParaEnvio === 0 ? (
                    <span className="text-success fw-bold">Gratis</span>
                  ) : (
                    <span>Por calcular</span>
                  )}
                </div>

                <hr className="my-3 opacity-25" />

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <span className="fs-5 fw-bold text-dark">Total</span>
                  <span className="fs-4 fw-bold text-success">
                    {formatearPrecio(total)}
                  </span>
                </div>

                {/* Cupón (Visual) */}
                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Código de descuento"
                    className="bg-light border-0"
                    style={{ fontSize: "0.9rem" }}
                  />
                  <Button
                    variant="outline-secondary"
                    className="border-0 bg-light text-dark fw-bold"
                  >
                    Aplicar
                  </Button>
                </InputGroup>

                <Button
                  className="w-100 btn-brand rounded-pill py-2 fw-bold shadow-sm mb-3"
                  disabled={carrito.length === 0}
                  size="lg"
                  // Aquí iría la lógica de Checkout
                  onClick={() => Swal.fire("Próximamente", "Integración con MercadoPago", "info")}
                >
                  Iniciar Compra
                </Button>

                <div className="d-flex justify-content-center gap-3 text-muted fs-4">
                  <i className="bi bi-credit-card" title="Tarjetas"></i>
                  <i className="bi bi-qr-code" title="QR"></i>
                  <i className="bi bi-cash-coin" title="Efectivo"></i>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Carrito;