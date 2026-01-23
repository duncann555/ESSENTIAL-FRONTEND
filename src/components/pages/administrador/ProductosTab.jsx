import { useState } from "react";
import { Row, Col, Button, InputGroup, Form, Card, Table, Badge } from "react-bootstrap";

function ProductosTab({
  productos = [],
  abrirModalProductoCrear,
  abrirModalProductoEditar,
  handleEliminarProducto,
  obtenerColorBadgeStock = (s) => (s > 10 ? "success" : s > 0 ? "warning" : "danger"),
  formatearPrecio = (p) => `$${p}`,
}) {
  const [busqueda, setBusqueda] = useState("");
  const q = busqueda.toLowerCase().trim();

  // Filtramos de forma segura
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
            className="btn btn-primary w-100"
            onClick={abrirModalProductoCrear}
          >
            <i className="bi bi-plus-lg me-2"></i>Agregar producto
          </Button>
        </Col>
        <Col md={8}>
          <InputGroup>
            <InputGroup.Text><i className="bi bi-search"></i></InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar por nombre o categoría..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table responsive striped hover className="mb-0 align-middle">
            <thead className="table-light">
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
                <tr key={prod._id || prod.uid}>
                  <td>
                    <img
                      src={prod.imagenUrl || "https://placehold.co/50x50?text=Sin+Img"}
                      alt={prod.nombre}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/50x50?text=Error";
                      }}
                    />
                  </td>
                  <td className="fw-semibold">{prod.nombre}</td>
                  <td><Badge bg="info" text="dark">{prod.categoria}</Badge></td>
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
                      {prod.estado || "Activo"}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => abrirModalProductoEditar(prod)}
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleEliminarProducto(prod._id)}
                        title="Eliminar"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {productosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-5">
                    <i className="bi bi-inbox fs-1 d-block mb-2"></i>
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