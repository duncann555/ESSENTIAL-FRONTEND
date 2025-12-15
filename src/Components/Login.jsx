import { Modal, Button, Form } from "react-bootstrap";
import "../styles/login.css";
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
    console.log(data);

    if (
      data.email === import.meta.env.VITE_API_EMAIL &&
      data.password === import.meta.env.VITE_API_PASSWORD
    ) {
      console.log("aqui logueo al usuario");
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
        title: "Ocurrio un error",
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
              placeholder="Ej: juanperez@mail.com"
              {...register("email", {
                required: "El email es un dato obligatorio",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  message: "El formato del email es incorrecto",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.email?.message}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresa una contraseña"
              {...register("password", {
                required: "La contraseña es un dato obligatorio",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                  message:
                    "La contraseña debe tener al menos 6 caracteres, una letra y un numero",
                },
              })}
            />
            <Form.Text className="text-danger">
              {errors.password?.message}
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 fw-semibold">
            Ingresar
          </Button>
        </Form>

        <div className="text-center my-3 text-muted">o continuar con</div>

        <div className="d-flex justify-content-center gap-3 mb-3">
          <Button
            variant="light"
            className="btn-social-facebook d-flex align-items-center gap-2 px-3"
          >
            <i className="bi bi-facebook fs-4 text-primary"></i>
            <span>Facebook</span>
          </Button>

          <Button
            variant="light"
            className="btn-social-instagram d-flex align-items-center gap-2 px-3"
          >
            <i className="bi bi-instagram fs-4 text-danger"></i>
            <span>Instagram</span>
          </Button>
        </div>

        <div className="text-center">
          <p className="text-muted mb-0">
            ¿No tenés cuenta?{" "}
            <a
              href="#"
              className="text-primary fw-semibold text-decoration-none"
              onClick={(e) => {
                e.preventDefault();
                handleShowRegister();
              }}
            >
              Registrate
            </a>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
