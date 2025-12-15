import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

function Login({ show, handleClose, handleShowRegister, setUsuarioLogueado }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate();

  const onSubmit = (data) => {
    if (
      data.email === import.meta.env.VITE_API_EMAIL &&
      data.password === import.meta.env.VITE_API_PASSWORD
    ) {
      setUsuarioLogueado(true);

      Swal.fire({
        title: "Bienvenido Administrador",
        text: "Iniciaste sesión correctamente",
        icon: "success",
      });

      handleClose();
      navegacion("/admin");
    } else {
      Swal.fire({
        title: "Ocurrió un error",
        text: "Credenciales incorrectas",
        icon: "error",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold text-primary">
          Iniciar Sesión
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ej: tu@correo.com"
              isInvalid={!!errors.email}
              {...register("email", {
                required: "El email es un dato obligatorio",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  message: "El formato del email es incorrecto",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresá tu contraseña"
              isInvalid={!!errors.password}
              {...register("password", {
                required: "La contraseña es un dato obligatorio",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "La contraseña debe tener al menos 6 caracteres, una letra y un numero",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* ¿Olvidaste tu contraseña? */}
          <div className="d-flex justify-content-end mb-3">
            <Button
              variant="link"
              className="p-0 text-decoration-none"
              onClick={() =>
                Swal.fire({
                  title: "Recuperar contraseña",
                  text:
                    "Todavía no está implementado. Si querés, lo armamos con 'Olvidé mi contraseña' en el backend.",
                  icon: "info",
                })
              }
            >
              ¿Olvidaste tu contraseña?
            </Button>
          </div>

          <Button variant="primary" type="submit" className="w-100 fw-semibold">
            Ingresar
          </Button>
        </Form>

        <div className="text-center my-3 text-muted">o continuar con</div>

        <div className="d-flex justify-content-center gap-3 mb-3 flex-wrap">
          <Button
            variant="outline-primary"
            className="d-flex align-items-center gap-2 px-3"
          >
            <i className="bi bi-facebook fs-4"></i>
            <span>Facebook</span>
          </Button>

          <Button
            variant="outline-danger"
            className="d-flex align-items-center gap-2 px-3"
          >
            <i className="bi bi-instagram fs-4"></i>
            <span>Instagram</span>
          </Button>
        </div>

        <div className="text-center">
          <p className="text-muted mb-0">
            ¿No tenés cuenta?{" "}
            <Button
              variant="link"
              className="p-0 fw-semibold text-decoration-none"
              onClick={handleShowRegister}
            >
              Registrate
            </Button>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
