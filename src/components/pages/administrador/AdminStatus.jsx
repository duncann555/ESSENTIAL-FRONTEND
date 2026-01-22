import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

function AdminStatus({ totalProductos, productosSinStock, totalUsuarios }) {
  return (
    <Row className="mb-4 g-4">
      {/* Productos Totales */}
      <Col md={4}>
        <Card className="status-card shadow-sm h-100">
          <Card.Body className="d-flex align-items-center gap-3">
            <div className="status-icon-wrapper bg-primary bg-opacity-10 text-primary">
              <i className="bi bi-box-seam"></i>
            </div>
            <div>
              <p className="text-muted mb-0 small fw-bold text-uppercase">Productos Totales</p>
              <h3 className="fw-bold mb-0 text-dark">{totalProductos}</h3>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Sin Stock */}
      <Col md={4}>
        <Card className="status-card shadow-sm h-100">
          <Card.Body className="d-flex align-items-center gap-3">
            <div className="status-icon-wrapper bg-danger bg-opacity-10 text-danger">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <div>
              <p className="text-muted mb-0 small fw-bold text-uppercase">Sin Stock</p>
              <h3 className="fw-bold mb-0 text-dark">{productosSinStock}</h3>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Usuarios */}
      <Col md={4}>
        <Card className="status-card shadow-sm h-100">
          <Card.Body className="d-flex align-items-center gap-3">
            <div className="status-icon-wrapper bg-success bg-opacity-10 text-success">
              <i className="bi bi-people-fill"></i>
            </div>
            <div>
              <p className="text-muted mb-0 small fw-bold text-uppercase">Usuarios Activos</p>
              <h3 className="fw-bold mb-0 text-dark">{totalUsuarios}</h3>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default AdminStatus;