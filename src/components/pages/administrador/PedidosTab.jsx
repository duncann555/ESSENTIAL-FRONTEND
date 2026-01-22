import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";

function PedidosTab({
  pedidos,
  handleCambiarEstadoPedido,
  handleEliminarPedido,
  abrirModalPedido,
  formatearPrecio, // Recibimos la función desde el padre
}) {
  const [busqueda, setBusqueda] = useState("");

  const q = busqueda.toLowerCase().trim();

  const pedidosFiltrados = pedidos.filter((p) => {
    if (!q) return true;

    return (
      // Usamos _id de Mongo
      String(p._id || "").includes(q) ||
      (p.cliente || "").toLowerCase().includes(q) ||
      (p.email || "").toLowerCase().includes(q) ||
      (p.estado || "").toLowerCase().includes(q) ||
      (p.fecha || "").toLowerCase().includes(q)
    );
  });

  // Si no pasaron la función formatearPrecio, usamos una local por seguridad
  const precioFmt = formatearPrecio || ((monto) =>
    Number(monto).toLocaleString("es-AR", { style: "currency", currency: "ARS" }));

  const obtenerColorEstado = (estado) => {
    if (estado === "Pendiente") return "warning";
    if (estado === "Completado") return "success";
    if (estado === "Cancelado") return "danger";
    return "secondary";
  };

  return (
    <>
      <Row className="align-items-center mb-3 g-2">
        <Col md={4}>
          <p className="text-muted mb-0 text-center mt-2 mt-md-1">
            Administración de pedidos
          </p>
        </Col>

        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar por ID, cliente, email, estado o fecha..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <Button
              className="btn-admin-primary"
              onClick={() => setBusqueda(busqueda.trim())}
            >
              Buscar
            </Button>
          </InputGroup>
        </Col>
      </Row>

      <Card className="admin-table-card shadow-sm">
        <Card.Body>
          <Card.Title className="fw-semibold text-primary">
            Listado de pedidos
          </Card.Title>

          <Table responsive striped hover className="mt-3 align-middle">
            <thead className="table-primary">
              <tr className="text-center">
                {/* <th>ID</th>  <-- Descomentar si querés ver el ID de Mongo */}
                <th>Cliente</th>
                <th>Email</th>
                <th>Fecha</th>
                <th>Ítems</th>
                <th>Total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {pedidosFiltrados.map((pedido) => (
                <tr key={pedido._id}> {/* KEY IMPORTANTE: _id */}
                  
                  {/* <td title={pedido._id} className="text-truncate" style={{maxWidth: '80px'}}>{pedido._id}</td> */}
                  
                  <td>{pedido.cliente}</td>
                  <td>{pedido.email}</td>
                  
                  {/* Formateo simple de fecha si viene como ISO string */}
                  <td>{new Date(pedido.fecha).toLocaleDateString()}</td>
                  
                  <td>{pedido.items?.length || 0}</td>
                  <td className="fw-bold">{precioFmt(pedido.total)}</td>
                  
                  <td>
                    <Badge bg={obtenerColorEstado(pedido.estado)}>
                      {pedido.estado}
                    </Badge>
                  </td>
                  
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => abrirModalPedido(pedido)}
                        title="Ver detalles"
                      >
                        <i className="bi bi-eye"></i>
                      </Button>

                      <Button
                        variant={
                          pedido.estado === "Pendiente"
                            ? "outline-success"
                            : "outline-secondary"
                        }
                        size="sm"
                        onClick={() => handleCambiarEstadoPedido(pedido._id)} // Pasamos _id
                        title={pedido.estado === "Pendiente" ? "Marcar Completado" : "Marcar Pendiente"}
                      >
                        <i className={`bi ${pedido.estado === "Pendiente" ? "bi-check-lg" : "bi-arrow-counterclockwise"}`}></i>
                      </Button>

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleEliminarPedido(pedido._id)} // Pasamos _id
                        title="Eliminar"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {pedidosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    No hay pedidos que coincidan con la búsqueda.
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

export default PedidosTab;