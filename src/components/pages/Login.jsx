import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

// 1. IMPORTAMOS EL CONTEXTO
import { useAuth } from "../../context/AuthContext";

export default function ModalLogin({ show, onClose }) {
  const navigate = useNavigate();
  
  // 2. TRAEMOS LA FUNCIÓN LOGIN DEL CONTEXTO
  const { login } = useAuth();

  const [email, setEmail] = useState(""); // Cambié 'user' por 'email' para ser más claro
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  if (!show) return null;

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !pass) {
      triggerError("Por favor, completá todos los campos.");
      return;
    }

    // Simulamos credenciales (esto vendrá del backend después)
    const adminEmail = import.meta.env.VITE_API_EMAIL || "admin@esenzia.com";
    const adminPass = import.meta.env.VITE_API_PASSWORD || "admin123";

    if (email === adminEmail && pass === adminPass) {
      // 3. CREAMOS EL OBJETO USUARIO ADMIN
      const usuarioAdmin = {
        nombre: "Sebastian",
        email: email,
        rol: "admin", // IMPORTANTE: El rol debe ser exacto
        id: 1
      };
      
      // 4. USAMOS LA FUNCIÓN DEL CONTEXTO
      login(usuarioAdmin); 
      
      setError("");
      // alert("¡Bienvenido Admin! 🌿"); // Opcional
      
      onClose();
      navigate("/admin");
      
    } else {
      // CASO USUARIO NORMAL (Simulado para pruebas)
      // Aquí podrías validar contra una lista o dejar pasar cualquiera que no sea admin
      // Por ahora, asumimos que si no es admin, es un usuario "Matias" de prueba si la pass es "1234"
      // O simplemente dejamos pasar cualquier cosa que no sea admin como usuario normal para probar.
      
      const usuarioNormal = {
        nombre: "Matias", // Nombre simulado
        email: email,
        rol: "usuario",
        id: 2
      };

      login(usuarioNormal);
      onClose();
      // navigate("/"); // Opcional: ir al home o quedarse donde estaba
    }
  };

  const triggerError = (msg) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
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
                type="email" // Mejor tipo email
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
            <a href="#" className="ml-forgot small">¿Olvidaste tu clave?</a>
          </div>

          {error && (
            <div className="alert alert-danger py-2 px-3 small text-center mb-3 border-0 bg-danger-subtle text-danger fw-semibold">
              <i className="bi bi-exclamation-circle me-2"></i>{error}
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
            ¿Aún no tenés cuenta? <a href="/register" className="ml-link-register">Registrate gratis</a>
          </p>
        </div>
      </div>
    </div>
  );
}