import { Modal, Button, Form } from "react-bootstrap";
import "../styles/login.css";

function Register({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-success">Registrarse</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* 👤 Nombre */}
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Nombre completo:</Form.Label>
            <Form.Control type="text" placeholder="Ej: Juan Pérez" />
          </Form.Group>

          {/* 📧 Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Ej: juanperez@mail.com" />
            <Form.Text className="text-muted">
              Nunca compartiremos tu correo con nadie.
            </Form.Text>
          </Form.Group>

          {/* 🔒 Contraseña */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control type="password" placeholder="Crea una contraseña" />
          </Form.Group>

          {/* 🔁 Confirmar contraseña */}
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirmar contraseña:</Form.Label>
            <Form.Control type="password" placeholder="Repite tu contraseña" />
          </Form.Group>

          {/* Botón principal */}
          <Button variant="success" type="submit" className="w-100 fw-semibold">
            Registrarme
          </Button>
        </Form>

        {/* 🔹 Enlace para ir al login */}
        <div className="text-center mt-3">
          <p className="text-muted mb-0">
            ¿Ya tenés cuenta?{" "}
            <a href="#" className="text-primary fw-semibold text-decoration-none">
              Iniciá sesión
            </a>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Register;
