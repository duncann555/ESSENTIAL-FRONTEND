import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import "../styles/login.css";
import { useForm } from "react-hook-form";

function Register({ show, handleClose, handleShowLogin }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const pass = watch("password");

  const handleGoLogin = (e) => {
    e.preventDefault();
    handleClose?.();
    handleShowLogin?.();
  };

  const onSubmit = (data) => {
    console.log("REGISTER:", data);
    handleClose?.();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-success">Registrarse</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre + Apellido */}
          <Row className="g-2">
            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: María"
                  autoComplete="given-name"
                  isInvalid={!!errors.nombre}
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                    maxLength: { value: 40, message: "Máximo 40 caracteres" },
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/,
                      message: "Solo letras",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nombre?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group className="mb-3" controlId="formApellido">
                <Form.Label>Apellido:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej: González"
                  autoComplete="family-name"
                  isInvalid={!!errors.apellido}
                  {...register("apellido", {
                    required: "El apellido es obligatorio",
                    minLength: { value: 2, message: "Mínimo 2 caracteres" },
                    maxLength: { value: 40, message: "Máximo 40 caracteres" },
                    pattern: {
                      value: /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/,
                      message: "Solo letras",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.apellido?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="tu@correo.com"
              autoComplete="email"
              isInvalid={!!errors.email}
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
                  message: "Email inválido",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>

            <Form.Text className="text-muted">
              Nunca compartiremos tu correo con nadie.
            </Form.Text>
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
              isInvalid={!!errors.password}
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
                maxLength: { value: 64, message: "Máximo 64 caracteres" },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Confirmar Password */}
          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Repetir contraseña:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Repetí tu contraseña"
              autoComplete="new-password"
              isInvalid={!!errors.confirmPassword}
              {...register("confirmPassword", {
                required: "Repetí la contraseña",
                validate: (value) =>
                  value === pass || "Las contraseñas no coinciden",
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="success" type="submit" className="w-100 fw-semibold">
            Registrarme
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p className="text-muted mb-0">
            ¿Ya tenés cuenta?{" "}
            <a
              href="#"
              className="text-primary fw-semibold text-decoration-none"
              onClick={handleGoLogin}
            >
              Iniciá sesión
            </a>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Register;
