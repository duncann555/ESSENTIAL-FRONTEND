import { useEffect, useState } from "react";
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
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: productoInicial,
  });

  const [preview, setPreview] = useState(null);

  const imagenFile = watch("imagen");

  useEffect(() => {
    if (imagenFile && imagenFile.length > 0) {
      const file = imagenFile[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [imagenFile]);

  useEffect(() => {
    if (productoInicial) {
      reset(productoInicial);
      setPreview(productoInicial.imagenUrl || null);
    }
  }, [productoInicial, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "imagen") {
        if (value && value.length > 0) {
          formData.append("imagenUrl", value[0]); // 🔥 coincide con multer
        }
      } else {
        formData.append(key, value);
      }
    });

    handleGuardarProducto(formData);
  };

  return (
    <Modal show={show} onHide={cerrarModalProducto} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          {modoProducto === "crear" ? "Nuevo Producto" : "Editar Producto"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} id="formProducto">

          {/* NOMBRE */}
          <FloatingLabel label="Nombre" className="mb-3">
            <Form.Control
              {...register("nombre", { required: "Obligatorio" })}
              isInvalid={!!errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </FloatingLabel>

          {/* CATEGORÍA + PRECIO */}
          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel label="Categoría">
                <Form.Select {...register("categoria", { required: true })}>
                  <option value="">Seleccionar</option>
                  <option value="Tinturas Madres">Tinturas Madres</option>
                  <option value="Aceites Esenciales">Aceites Esenciales</option>
                  <option value="Cosmética Natural">Cosmética Natural</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Precio">
                <Form.Control
                  type="number"
                  {...register("precio", { required: true })}
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* STOCK */}
          <FloatingLabel label="Stock" className="mb-3">
            <Form.Control
              type="number"
              {...register("stock", { required: true })}
            />
          </FloatingLabel>

          {/* IMAGEN */}
          <FloatingLabel label="Imagen" className="mb-3">
            <Form.Control
              type="file"
              accept="image/*"
              {...register("imagen", {
                required: modoProducto === "crear",
              })}
            />
          </FloatingLabel>

          {preview && (
            <div className="text-center mb-3">
              <img
                src={preview}
                alt="preview"
                style={{ maxHeight: "120px" }}
              />
            </div>
          )}

          {/* DESCRIPCIÓN */}
          <FloatingLabel label="Descripción">
            <Form.Control
              as="textarea"
              style={{ height: 100 }}
              {...register("descripcion", { required: true })}
            />
          </FloatingLabel>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModalProducto}>
          Cancelar
        </Button>
        <Button type="submit" form="formProducto">
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductoModal;
