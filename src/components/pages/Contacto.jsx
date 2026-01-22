import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "../../styles/contacto.css";

export default function Contacto() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async (data) => {
    // Simulamos un delay de red para que se luzca el loading
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Datos enviados:", data);

    Swal.fire({
      icon: "success",
      title: "¡Recibido!",
      text: "Tu mensaje ya está con nosotros. Te contestamos en breve.",
      confirmButtonColor: "#53B852",
      confirmButtonText: "Genial",
      buttonsStyling: false,
      customClass: {
        confirmButton: 'btn btn-success rounded-pill px-4'
      }
    });
    
    reset();
  };

  return (
    <div className="page-wrapper bg-light min-vh-100 py-5">
      <Container className="contacto-container">
        
        {/* HEADER SIMPLE */}
        <div className="text-center mb-5 fade-in-up">
          <h1 className="fw-bold display-5 mb-3 text-dark font-playfair">Hablemos</h1>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Estamos acá para ayudarte con tu bienestar. Si tenés dudas sobre envíos, 
            productos o tratamientos, escribinos.
          </p>
        </div>

        <Row className="g-0 shadow-lg rounded-4 overflow-hidden fade-in-up delay-1">
          
          {/* COLUMNA 1: FORMULARIO (Blanco) */}
          <Col xs={12} lg={7} className="bg-white p-4 p-md-5">
            <h4 className="fw-bold mb-4 text-success">Envianos tu consulta</h4>
            
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Row className="g-3">
                {/* Nombre */}
                <Col xs={12} md={6}>
                  <FloatingLabel controlId="nombre" label="Nombre completo">
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      className={`form-control-clean ${errors.nombre ? "is-invalid" : ""}`}
                      {...register("nombre", {
                        required: "Requerido",
                        minLength: { value: 3, message: "Mínimo 3 letras" },
                      })}
                    />
                  </FloatingLabel>
                  {errors.nombre && <small className="text-danger ms-2">{errors.nombre.message}</small>}
                </Col>

                {/* Email */}
                <Col xs={12} md={6}>
                  <FloatingLabel controlId="email" label="Email">
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      className={`form-control-clean ${errors.email ? "is-invalid" : ""}`}
                      {...register("email", {
                        required: "Requerido",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Email inválido",
                        },
                      })}
                    />
                  </FloatingLabel>
                  {errors.email && <small className="text-danger ms-2">{errors.email.message}</small>}
                </Col>

                {/* Teléfono */}
                <Col xs={12}>
                  <FloatingLabel controlId="telefono" label="Teléfono (Opcional)">
                    <Form.Control
                      type="tel"
                      placeholder="Teléfono"
                      className="form-control-clean"
                      {...register("telefono")}
                    />
                  </FloatingLabel>
                </Col>

                {/* Mensaje */}
                <Col xs={12}>
                  <FloatingLabel controlId="mensaje" label="¿En qué te ayudamos?">
                    <Form.Control
                      as="textarea"
                      placeholder="Deja tu mensaje aquí"
                      style={{ height: '150px' }}
                      className={`form-control-clean ${errors.mensaje ? "is-invalid" : ""}`}
                      {...register("mensaje", {
                        required: "Por favor escribí tu consulta",
                        minLength: { value: 10, message: "Mínimo 10 caracteres" },
                      })}
                    />
                  </FloatingLabel>
                  {errors.mensaje && <small className="text-danger ms-2">{errors.mensaje.message}</small>}
                </Col>
                
                <Col xs={12} className="mt-4">
                  <Button
                    type="submit"
                    variant="success"
                    size="lg"
                    className="w-100 rounded-pill fw-bold shadow-sm btn-hover-effect"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span><i className="bi bi-arrow-repeat spin me-2"></i>Enviando...</span>
                    ) : (
                      "Enviar Mensaje"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>

          {/* COLUMNA 2: INFO (Verde / Brand) */}
          <Col xs={12} lg={5} className="bg-brand-gradient text-white p-4 p-md-5 d-flex flex-column justify-content-center position-relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="circle-deco"></div>

            <div className="position-relative z-1">
              <h3 className="fw-bold mb-4 font-playfair">Información de contacto</h3>
              <p className="opacity-75 mb-5">
                También podés encontrarnos en nuestras redes o escribirnos directamente por WhatsApp.
              </p>

              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="icon-box">
                    <i className="bi bi-envelope-fill"></i>
                  </div>
                  <div>
                    <span className="d-block text-uppercase small opacity-75 fw-bold">Email</span>
                    <span className="fs-5 fw-medium">contacto@esenzia.com</span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="icon-box">
                    <i className="bi bi-whatsapp"></i>
                  </div>
                  <div>
                    <span className="d-block text-uppercase small opacity-75 fw-bold">WhatsApp</span>
                    <span className="fs-5 fw-medium">+54 9 381 123-4567</span>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="icon-box">
                    <i className="bi bi-clock-fill"></i>
                  </div>
                  <div>
                    <span className="d-block text-uppercase small opacity-75 fw-bold">Horarios</span>
                    <span className="fs-5 fw-medium">Lun a Vie • 9 a 18 hs</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-top border-white border-opacity-25">
                <span className="d-block text-uppercase small opacity-75 fw-bold mb-3">Seguinos</span>
                <div className="d-flex gap-3">
                  <a href="#" className="social-link"><i className="bi bi-instagram"></i></a>
                  <a href="#" className="social-link"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="social-link"><i className="bi bi-tiktok"></i></a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}