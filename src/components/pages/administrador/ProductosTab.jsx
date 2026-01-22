import { useState } from "react";
import { Row, Col, Button, InputGroup, Form, Card, Table, Badge } from "react-bootstrap";

function ProductosTab({
  productos,
  abrirModalProductoCrear,
  abrirModalProductoEditar,
  handleEliminarProducto,
  handleSuspenderProducto,
  obtenerColorBadgeStock,
  formatearPrecio,
}) {
  const [busqueda, setBusqueda] = useState("");
  const q = busqueda.toLowerCase().trim();

  // Filtramos usando _id si está disponible, o fallback a string vacío
  const productosFiltrados = productos.filter((p) => {
    if (!q) return true;
    return (
      (p.nombre || "").toLowerCase().includes(q) ||
      (p.categoria || "").toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Row className="align-items-center mb-3 g-2">
        <Col md={4}>
          <Button
            className="btn-admin-primary w-100"
            onClick={abrirModalProductoCrear}
          >
            + Agregar producto
          </Button>
        </Col>
        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o categoría..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Card className="admin-table-card shadow-sm">
        <Card.Body>
          <Table responsive striped hover className="mt-3 align-middle">
            <thead className="table-primary">
              <tr className="text-center">
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {productosFiltrados.map((prod) => (
                <tr key={prod._id}> {/* USAMOS _id DE MONGO */}
                  <td>
                    <img
                      src={prod.imagenUrl}
                      alt={prod.nombre}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/50x50?text=Sin+Img";
                      }}
                    />
                  </td>
                  <td>{prod.nombre}</td>
                  <td>{prod.categoria}</td>
                  <td>
                    <Badge bg={obtenerColorBadgeStock(prod.stock)}>
                      {prod.stock}
                    </Badge>
                  </td>
                  <td>{formatearPrecio(prod.precio)}</td>
                  <td>
                    <Badge
                      bg={prod.estado === "Activo" ? "success" : "secondary"}
                    >
                      {prod.estado}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => abrirModalProductoEditar(prod)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>

                      {/* Botón suspender (Opcional si tu back lo soporta) */}
                      {/* <Button
                        variant={prod.estado === "Activo" ? "outline-warning" : "outline-success"}
                        size="sm"
                        onClick={() => handleSuspenderProducto(prod._id)}
                      >
                        <i className={`bi ${prod.estado === "Activo" ? "bi-pause-circle" : "bi-play-circle"}`}></i>
                      </Button> 
                      */}

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleEliminarProducto(prod._id)} // Pasamos _id
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {productosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    No hay productos que coincidan con la búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProductosTab;