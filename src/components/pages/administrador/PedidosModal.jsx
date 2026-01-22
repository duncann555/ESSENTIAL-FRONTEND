import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

function PedidoModal({ show, pedido, cerrarModal }) {
  if (!pedido) return null;

  const formatearPrecio = (precio) =>
    Number(precio).toLocaleString("es-AR", { style: "currency", currency: "ARS" });

  return (
    <Modal show={show} onHide={cerrarModal} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          Detalle de Envío <small className="text-muted fs-6">#{pedido._id}</small>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row">
          <div className="col-12">
            <h5 className="mb-3 border-bottom pb-2 text-primary">Información del cliente</h5>
          </div>
          
          <div className="col-md-6">
            <p className="mb-2">
              <strong>Cliente:</strong> {pedido.cliente || "Anónimo"}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {pedido.email || "-"}
            </p>
            <p className="mb-2">
              <strong>Teléfono:</strong> {pedido.telefono || "-"}
            </p>
          </div>

          <div className="col-md-6">
            <p className="mb-2">
              <strong>Dirección:</strong> {pedido.direccion || "-"}
            </p>
            <p className="mb-2">
              <strong>CP:</strong> {pedido.cp || "-"}
            </p>
            <p className="mb-2">
              <strong>Fecha:</strong> {pedido.fecha ? new Date(pedido.fecha).toLocaleDateString() : "-"}
            </p>
          </div>
        </div>

        <h5 className="mt-4 mb-3 border-bottom pb-2 text-primary">Ítems del pedido</h5>

        <Table striped hover responsive className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Producto</th>
              <th className="text-center">Cantidad</th>
              <th className="text-end">Precio unitario</th>
              <th className="text-end">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {pedido.items?.map((item, i) => (
              <tr key={item._id || i}> {/* Usamos item._id si existe, sino el índice */}
                <td>{item.nombre}</td>
                <td className="text-center">{item.cantidad}</td>
                <td className="text-end">{formatearPrecio(item.precio)}</td>
                <td className="text-end fw-semibold">
                  {formatearPrecio(item.precio * item.cantidad)}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-end align-items-center mt-3 gap-3">
            <span className="fs-5 text-muted">Total del pedido:</span>
            <Badge bg="success" className="fs-4 px-4 py-2">
                {formatearPrecio(pedido.total)}
            </Badge>
        </div>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={cerrarModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PedidoModal;