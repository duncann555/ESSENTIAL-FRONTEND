import { useEffect } from "react";
import { Modal, Button, Form, FloatingLabel, Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";

function ProductoModal({
  show,
  modoProducto,
  productoInicial,
  cerrarModalProducto,
  handleGuardarProducto,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch, // Para ver la URL en tiempo real
    formState: { errors },
  } = useForm({
    defaultValues: productoInicial,
  });

  // Observamos el campo imagen para la previsualización
  const imagenUrlValue = watch("imagenUrl");

  // EFECTO: Resetea el formulario cuando cambia el producto seleccionado
  useEffect(() => {
    if (productoInicial) {
      // COPIA DEL OBJETO PARA NO MUTAR EL ORIGINAL
      const datosParaFormulario = { ...productoInicial };

      // CORRECCIÓN DE FECHA PARA MONGODB
      // Si viene una fecha ISO (2025-11-15T00:00:00.000Z), la cortamos a YYYY-MM-DD
      if (datosParaFormulario.fechaControl) {
        try {
            const fechaObj = new Date(datosParaFormulario.fechaControl);
            // Validamos que sea una fecha válida antes de formatear
            if (!isNaN(fechaObj.getTime())) {
                datosParaFormulario.fechaControl = fechaObj.toISOString().split('T')[0];
            }
        } catch (e) {
            console.error("Error formateando fecha:", e);
        }
      }

      reset(datosParaFormulario);
    }
  }, [productoInicial, reset]);

  const onSubmit = (data) => {
    handleGuardarProducto(data);
  };

  return (
    <Modal show={show} onHide={cerrarModalProducto} centered size="lg">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold text-dark">
          {modoProducto === "crear" ? "Nuevo Producto" : "Editar Producto"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-4">
        <Form onSubmit={handleSubmit(onSubmit)} id="formProducto">
          
          {/* NOMBRE */}
          <FloatingLabel controlId="nombre" label="Nombre del producto" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Ej: Tintura Madre Valeriana"
              isInvalid={!!errors.nombre}
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
                maxLength: { value: 50, message: "Máximo 50 caracteres" },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </FloatingLabel>

          <Row className="g-3 mb-3">
            {/* CATEGORÍA */}
            <Col md={6}>
              <FloatingLabel controlId="categoria" label="Categoría">
                <Form.Select
                  isInvalid={!!errors.categoria}
                  {...register("categoria", {
                    required: "Seleccioná una categoría",
                  })}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Tinturas Madres">Tinturas Madres</option>
                  <option value="Aceites Esenciales">Aceites Esenciales</option>
                  <option value="Cosmética Natural">Cosmética Natural</option>
                  <option value="Fitoterapia">Fitoterapia</option>
                  <option value="Infusiones">Infusiones</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.categoria?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            {/* PRECIO */}
            <Col md={6}>
              <FloatingLabel controlId="precio" label="Precio ($)">
                <Form.Control
                  type="number"
                  placeholder="Precio"
                  min="1"
                  isInvalid={!!errors.precio}
                  {...register("precio", {
                    required: "Requerido",
                    min: { value: 1, message: "Mayor a 0" },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.precio?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>

          <Row className="g-3 mb-3">
            {/* STOCK */}
            <Col md={6}>
              <FloatingLabel controlId="stock" label="Stock disponible">
                <Form.Control
                  type="number"
                  placeholder="Stock"
                  min="0"
                  isInvalid={!!errors.stock}
                  {...register("stock", {
                    required: "Requerido",
                    min: { value: 0, message: "No negativo" },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.stock?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>

            {/* FECHA CONTROL */}
            <Col md={6}>
              <FloatingLabel controlId="fechaControl" label="Último control">
                <Form.Control 
                  type="date" 
                  {...register("fechaControl")} 
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* NUEVO: SWITCH DE OFERTA */}
          <div className="mb-3 p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between">
            <div>
                <strong className="d-block text-dark">¿Es una Oferta?</strong>
                <small className="text-muted">Si lo activás, aparecerá en el carrusel de ofertas del inicio.</small>
            </div>
            <Form.Check 
                type="switch"
                id="oferta-switch"
                className="fs-4"
                {...register("oferta")} 
            />
          </div>

          {/* IMAGEN + PREVIEW */}
          <Row className="mb-3">
            <Col md={imagenUrlValue ? 9 : 12}>
              <FloatingLabel controlId="imagenUrl" label="URL de la imagen">
                <Form.Control
                  type="url"
                  placeholder="https://..."
                  isInvalid={!!errors.imagenUrl}
                  {...register("imagenUrl", {
                    required: "La imagen es obligatoria",
                    pattern: {
                      value: /^(https?:\/\/).+/i,
                      message: "Debe ser una URL válida (http/https)",
                    },
                  })}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.imagenUrl?.message}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
            
            {/* Preview de imagen si hay URL válida */}
            {imagenUrlValue && (
              <Col md={3} className="d-flex align-items-center justify-content-center">
                <div 
                  className="border rounded p-1 d-flex justify-content-center align-items-center bg-white shadow-sm" 
                  style={{width: '60px', height: '60px'}}
                >
                  <img 
                    src={imagenUrlValue} 
                    alt="Preview" 
                    className="img-fluid" 
                    style={{maxHeight: '100%', objectFit: 'contain'}}
                    onError={(e) => e.target.style.display = 'none'} // Ocultar si falla
                  />
                </div>
              </Col>
            )}
          </Row>

          {/* DESCRIPCIÓN */}
          <FloatingLabel controlId="descripcion" label="Descripción del producto">
            <Form.Control
              as="textarea"
              placeholder="Descripción"
              style={{ height: '100px' }}
              isInvalid={!!errors.descripcion}
              {...register("descripcion", {
                required: "La descripción es obligatoria",
                minLength: { value: 10, message: "Mínimo 10 caracteres" },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descripcion?.message}
            </Form.Control.Feedback>
          </FloatingLabel>

        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0 pb-4">
        <Button 
          variant="outline-secondary" 
          onClick={cerrarModalProducto}
          className="rounded-pill px-4"
        >
          Cancelar
        </Button>
        <Button 
          className="btn-admin-primary rounded-pill px-4" 
          type="submit" 
          form="formProducto"
        >
          {modoProducto === "crear" ? "Crear Producto" : "Guardar Cambios"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductoModal;