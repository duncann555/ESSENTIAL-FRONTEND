import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

// CONTEXTO DE AUTH
import { useAuth } from "../../context/AuthContext";

export default function Login({ show, onClose }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  // Si show es falso, no renderizamos nada (Modal oculto)
  if (!show) return null;

  const triggerError = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !pass) {
      triggerError("Por favor, completá todos los campos.");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/usuarios/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password: pass,
          }),
        },
      );

      const data = await res.json();

      // 🕵️‍♂️ CHISMOSO: Mirá la consola (F12) para ver qué llegó
      console.log("Respuesta del Backend:", data);

      if (!res.ok) {
        throw new Error(data.mensaje || "Error al iniciar sesión");
      }

      // 🧠 LÓGICA INTELIGENTE:
      // Si el backend manda { usuario: {...} } usamos eso.
      // Si manda los datos sueltos (versión vieja), usamos data directo.
      const usuarioData = data.usuario || data;

      // Armamos el objeto limpio para el contexto
      const usuarioNormalizado = {
        uid: usuarioData.uid || usuarioData._id, // Acepta uid o _id
        nombre: usuarioData.nombre,
        email: usuarioData.email,
        rol: usuarioData.rol,
      };

      // Verificamos que no haya llegado vacío
      if (!usuarioNormalizado.nombre || !usuarioNormalizado.rol) {
        console.warn(
          "⚠️ ALERTA: El usuario llegó sin nombre o rol. Revisar Base de Datos.",
        );
      }

      // Guardamos en el contexto
      login(usuarioNormalizado, data.token);

      setError("");
      onClose(); // Cerramos el modal

      // 🚦 Redirección según el rol que llegó
      if (usuarioNormalizado.rol === "Administrador") {
        navigate("/admin"); // <--- ESTO SÍ COINCIDE CON TU APP.JSX
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      triggerError(err.message || "Error de conexión");
    }
  };

  return (
    <div className="ml-overlay" onClick={onClose}>
      <div
        className={`ml-modal ${shake ? "shake" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="ml-close" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="text-center mb-4">
          <div className="ml-brand-badge mb-3">Acceso Clientes</div>
          <h2 className="ml-title font-playfair">Bienvenido</h2>
          <p className="text-muted small">
            Ingresá a tu cuenta para gestionar tus pedidos naturales.
          </p>
        </div>

        <Form onSubmit={handleLogin} noValidate>
          <div className="mb-3">
            <FloatingLabel controlId="floatingUser" label="Email">
              <Form.Control
                type="email"
                placeholder="Email"
                className="ml-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
          </div>

          <div className="mb-3 position-relative">
            <FloatingLabel controlId="floatingPass" label="Contraseña">
              <Form.Control
                type={showPass ? "text" : "password"}
                placeholder="Contraseña"
                className="ml-input pe-5"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </FloatingLabel>

            <span
              className="ml-eye-icon"
              onClick={() => setShowPass(!showPass)}
              style={{ cursor: "pointer" }}
            >
              <i className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"}`}></i>
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <Form.Check
              type="checkbox"
              id="remember"
              label="Recordarme"
              className="ml-checkbox small text-muted"
            />
            <a href="#" className="ml-forgot small">
              ¿Olvidaste tu clave?
            </a>
          </div>

          {error && (
            <div className="alert alert-danger py-2 px-3 small text-center mb-3 border-0 bg-danger-subtle text-danger fw-semibold">
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          <Button type="submit" className="ml-btn-primary w-100 mb-3">
            Ingresar
          </Button>

          <div className="ml-divider">
            <span>o continuá con</span>
          </div>

          <div className="d-flex gap-2">
            <Button variant="outline-light" className="ml-social-btn google">
              <i className="bi bi-google"></i> Google
            </Button>
            <Button variant="outline-light" className="ml-social-btn facebook">
              <i className="bi bi-facebook"></i>
            </Button>
          </div>
        </Form>

        <div className="text-center mt-4 pt-3 border-top">
          <p className="mb-0 small text-muted">
            ¿Aún no tenés cuenta?{" "}
            <a href="/register" className="ml-link-register">
              Registrate gratis
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
