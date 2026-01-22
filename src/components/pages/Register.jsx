import { useState } from "react";
import { Form, Button, Row, Col, FloatingLabel, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/register.css";

// URL DEL BACKEND
const API_URL = "http://localhost:4000/api/usuarios"; 

const initialValues = {
  nombre: "", // Cambié fullName por nombre para coincidir con el modelo de backend
  email: "",
  password: "",
  confirmPassword: "",
  telefono: "", // Opcional, pero útil
  terms: false,
};

// --- VALIDACIONES ---
function validateField(name, value, allValues) {
  const v = typeof value === "string" ? value.trim() : value;

  switch (name) {
    case "nombre":
      if (!v) return "Requerido.";
      if (v.length < 3) return "Mínimo 3 letras.";
      return "";
    case "email":
      if (!v) return "Requerido.";
      // Regex estándar para email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Email inválido.";
      return "";
    case "telefono":
      // Validamos solo si escribe algo (si es opcional) o siempre si es requerido
      if (v && !/^\d{8,15}$/.test(v)) return "Número inválido.";
      return "";
    case "password":
      if (!v) return "Requerida.";
      if (v.length < 6) return "Mínimo 6 caracteres."; // Ajustá según tu política
      return "";
    case "confirmPassword":
      if (!v) return "Requerida.";
      if (v !== allValues.password) return "Las contraseñas no coinciden.";
      return "";
    case "terms":
      if (!value) return "Debés aceptar los términos.";
      return "";
    default:
      return "";
  }
}

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === "checkbox" ? checked : value;
    const newValues = { ...values, [name]: newVal };
    setValues(newValues);

    // Si el campo ya fue tocado, validamos en tiempo real
    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name, newVal, newValues),
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({
      ...errors,
      [name]: validateField(name, values[name], values),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Validar todo antes de enviar
    const newErrors = {};
    let isValid = true;
    Object.keys(values).forEach(key => {
        const err = validateField(key, values[key], values);
        if(err) {
            newErrors[key] = err;
            isValid = false;
        }
    });
    setErrors(newErrors);
    setTouched(Object.keys(values).reduce((acc, curr) => ({...acc, [curr]: true}), {}));

    if (!isValid) return;

    setLoading(true);

    try {
      // 2. ENVIAR AL BACKEND
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre: values.nombre,
            email: values.email,
            password: values.password,
            rol: "usuario", // Por defecto siempre creamos usuarios normales
            estado: "Activo"
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || "Error al registrarse");
      }

      // 3. ÉXITO
      Swal.fire({
        icon: "success",
        title: "¡Bienvenido/a!",
        text: "Tu cuenta fue creada con éxito.",
        confirmButtonColor: "#198754"
      }).then(() => {
          navigate("/"); // Redirigir al home o login
          // Si querés auto-loguearlo, podrías llamar a login(data) acá si el back devuelve token
      });

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        confirmButtonColor: "#dc3545"
      });
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="reg-page-wrapper bg-light min-vh-100 d-flex align-items-center py-5">
      <Container>
        <div className="reg-card shadow-lg overflow-hidden rounded-4">
          <Row className="g-0">
            
            {/* COLUMNA 1: INFO VISUAL */}
            <Col lg={4} className="reg-info-col d-none d-lg-flex flex-column justify-content-center p-5 text-white bg-brand-gradient position-relative" style={{background: 'linear-gradient(135deg, #198754 0%, #0f5132 100%)'}}>
              <div className="position-relative z-1">
                <h2 className="font-playfair fw-bold mb-4">Unite a nuestra comunidad</h2>
                <p className="opacity-75 mb-4">
                  Creá tu cuenta para gestionar pedidos, guardar tus favoritos y acceder a descuentos exclusivos en productos naturales.
                </p>
                <ul className="list-unstyled opacity-75 mb-5">
                  <li className="mb-2"><i className="bi bi-check2-circle me-2"></i>Seguimiento de envíos</li>
                  <li className="mb-2"><i className="bi bi-check2-circle me-2"></i>Historial de compras</li>
                  <li className="mb-2"><i className="bi bi-check2-circle me-2"></i>Ofertas especiales</li>
                </ul>
                <div className="mt-auto">
                    <p className="mb-2 small opacity-75">¿Ya tenés cuenta?</p>
                    {/* Como el Login es un modal, acá podrías poner un botón que abra el modal si tenés acceso a la función, 
                        o simplemente redirigir al home y que el usuario abra el login. 
                        Por simplicidad, lo mandamos al home.*/}
                    <Link to="/" className="btn btn-outline-light rounded-pill px-4 fw-semibold w-100">
                        Volver al Inicio
                    </Link>
                </div>
              </div>
            </Col>

            {/* COLUMNA 2: FORMULARIO */}
            <Col lg={8} className="bg-white p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="font-playfair fw-bold text-dark">Crear Cuenta</h2>
                <p className="text-muted small">Completá tus datos para registrarte</p>
              </div>

              <Form onSubmit={handleSubmit} noValidate>
                  <Row className="g-3">
                    
                    {/* NOMBRE */}
                    <Col md={12}>
                        <FloatingLabel controlId="nombre" label="Nombre Completo">
                        <Form.Control
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={values.nombre}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="reg-input"
                            isInvalid={touched.nombre && !!errors.nombre}
                        />
                        <Form.Control.Feedback type="invalid">{errors.nombre}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                    
                    {/* EMAIL */}
                    <Col md={12}>
                        <FloatingLabel controlId="email" label="Correo Electrónico">
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="reg-input"
                            isInvalid={touched.email && !!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    {/* PASSWORD */}
                    <Col md={6}>
                        <FloatingLabel controlId="password" label="Contraseña">
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Contraseña"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="reg-input"
                            isInvalid={touched.password && !!errors.password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    {/* CONFIRM PASSWORD */}
                    <Col md={6}>
                        <FloatingLabel controlId="confirmPassword" label="Repetir Contraseña">
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            placeholder="Repetir Contraseña"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="reg-input"
                            isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>

                    {/* TÉRMINOS */}
                    <Col xs={12}>
                        <Form.Check
                            type="checkbox"
                            id="terms"
                            name="terms"
                            label="Acepto los términos y condiciones"
                            checked={values.terms}
                            onChange={handleChange}
                            isInvalid={touched.terms && !!errors.terms}
                            feedback={errors.terms}
                            feedbackType="invalid"
                            className="small text-muted"
                        />
                    </Col>

                    {/* BOTÓN SUBMIT */}
                    <Col xs={12} className="mt-4">
                        <Button 
                            type="submit" 
                            className="w-100 btn-lg rounded-pill fw-bold btn-success"
                            disabled={loading}
                        >
                            {loading ? "Creando cuenta..." : "Registrarme"}
                        </Button>
                    </Col>
                  </Row>
              </Form>

              <div className="text-center mt-4 d-lg-none">
                  <Link to="/" className="text-success fw-bold text-decoration-none">Volver al inicio</Link>
              </div>

            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}