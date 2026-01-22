import { useState } from "react";
import { Row, Col, InputGroup, Form, Button, Card, Table, Badge } from "react-bootstrap";

function UsuariosTab({
  usuarios,
  abrirModalUsuarioEditar,
  handleEliminarUsuario,
  handleSuspenderUsuario,
}) {
  const [busqueda, setBusqueda] = useState("");
  const q = busqueda.toLowerCase().trim();

  // FILTRADO (usando _id en lugar de id para compatibilidad con Mongo)
  const usuariosFiltrados = usuarios.filter((u) => {
    if (!q) return true;
    return (
      // Usamos u._id si existe, si no fallback a string vacío para no romper
      String(u._id || "").includes(q) ||
      (u.nombre || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.rol || "").toLowerCase().includes(q) ||
      (u.estado || "").toLowerCase().includes(q)
    );
  });

  return (
    <>
      <Row className="align-items-center mb-3 g-2">
        <Col md={4}>
          <p className="text-muted mb-0 text-center mt-2 mt-md-1">
            Administración de usuarios
          </p>
        </Col>

        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Buscar por id, nombre, email, rol o estado..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            {/* El botón Buscar es opcional ya que el filtro es en tiempo real, pero lo dejamos por UX */}
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
            Listado de usuarios
          </Card.Title>

          <Table responsive striped hover className="mt-3">
            <thead className="table-primary">
              <tr className="text-center">
                {/* <th>ID</th>  <-- Opcional: Si el _id es muy largo a veces conviene ocultarlo */}
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {usuariosFiltrados.map((user) => (
                <tr key={user._id}> {/* IMPORTANTE: key={user._id} */}
                  
                  {/* Si querés mostrar el ID descomentá esto: */}
                  {/* <td title={user._id} className="text-truncate" style={{maxWidth: '100px'}}>{user._id}</td> */}

                  <td>{user.nombre} {user.apellido}</td> {/* Agregué apellido por si el modelo lo tiene */}
                  <td>{user.email}</td>
                  
                  <td>
                    <Badge bg={user.rol === "Administrador" ? "dark" : "info"}>
                      {user.rol}
                    </Badge>
                  </td>
                  
                  <td>
                    <Badge
                      bg={
                        user.estado === "Activo"
                          ? "success"
                          : user.estado === "Suspendido"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {user.estado}
                    </Badge>
                  </td>
                  
                  <td>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => abrirModalUsuarioEditar(user)}
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>

                      {/* Botón Suspender (Opcional, depende de si tu back lo soporta) */}
                      {/* <Button
                        variant={user.estado === "Activo" ? "outline-warning" : "outline-success"}
                        size="sm"
                        onClick={() => handleSuspenderUsuario(user._id)} // Pasamos _id
                        title={user.estado === "Activo" ? "Suspender" : "Activar"}
                      >
                        <i className={`bi ${user.estado === "Activo" ? "bi-slash-circle" : "bi-check-circle"}`}></i>
                      </Button>
                      */}

                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleEliminarUsuario(user._id)} // Pasamos _id
                        title="Eliminar"
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {usuariosFiltrados.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    No hay usuarios que coincidan con la búsqueda.
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

export default UsuariosTab;