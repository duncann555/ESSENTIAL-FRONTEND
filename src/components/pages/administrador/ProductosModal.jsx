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
  } = useForm();

  const [preview, setPreview] = useState(null);
  
  const imagenFile = watch("imagen");

  useEffect(() => {
    if (imagenFile && imagenFile.length > 0) {
      const file = imagenFile[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [imagenFile]);

  useEffect(() => {
    if (show) {
        if (productoInicial && modoProducto === 'editar') {
            reset(productoInicial);
            setPreview(productoInicial.imagenUrl || null);
        } else {
            reset({
                nombre: "",
                categoria: "",
                precio: "",
                stock: "",
                descripcion: "",
                imagen: "" 
            });
            setPreview(null);
        }
    }
  }, [productoInicial, modoProducto, show, reset]);

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "imagen") {
        if (value && value.length > 0) {
          // El backend espera "imagen" (según tu código de multer)
          formData.append("imagen", value[0]); 
        }
      } else {
        formData.append(key, value);
      }
    });

    handleGuardarProducto(formData);
  };

  return (
    <Modal show={show} onHide={cerrarModalProducto} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {modoProducto === "crear" ? "Nuevo Producto" : "Editar Producto"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="formProducto" onSubmit={handleSubmit(onSubmit)}>

          {/* NOMBRE */}
          <FloatingLabel label="Nombre del Producto" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nombre"
              {...register("nombre", { required: "El nombre es obligatorio" })}
              isInvalid={!!errors.nombre}
            />
          </FloatingLabel>

          {/* CATEGORÍA + PRECIO */}
          <Row className="mb-3">
            <Col md={6}>
              <FloatingLabel label="Categoría">
                <Form.Select 
                    {...register("categoria", { required: "Selecciona una categoría" })}
                    isInvalid={!!errors.categoria}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Tinturas Madres">Tinturas Madres</option>
                  <option value="Aceites Esenciales">Aceites Esenciales</option>
                  <option value="Cosmética Natural">Cosmética Natural</option>
                  <option value="Infusiones">Infusiones</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel label="Precio ($)">
                <Form.Control
                  type="number"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  {...register("precio", { required: "El precio es obligatorio" })}
                  isInvalid={!!errors.precio}
                />
              </FloatingLabel>
            </Col>
          </Row>

          {/* STOCK */}
          <FloatingLabel label="Stock Disponible" className="mb-3">
            <Form.Control
              type="number"
              placeholder="0"
              min="0"
              {...register("stock", { required: "El stock es obligatorio" })}
              isInvalid={!!errors.stock}
            />
          </FloatingLabel>

          {/* IMAGEN */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Imagen del Producto</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              {...register("imagen", {
                required: modoProducto === "crear" ? "La imagen es obligatoria" : false,
              })}
              isInvalid={!!errors.imagen}
            />
          </Form.Group>

          {preview && (
            <div className="text-center mb-3 p-2 border rounded bg-light">
              <img
                src={preview}
                alt="preview"
                className="img-fluid rounded shadow-sm"
                style={{ maxHeight: "150px" }}
              />
            </div>
          )}

          {/* DESCRIPCIÓN */}
          <FloatingLabel label="Descripción Detallada">
            <Form.Control
              as="textarea"
              placeholder="Descripción"
              style={{ height: "120px" }}
              {...register("descripcion", { required: "La descripción es obligatoria" })}
              isInvalid={!!errors.descripcion}
            />
          </FloatingLabel>
          
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={cerrarModalProducto}>
          Cancelar
        </Button>
        <Button variant="success" type="submit" form="formProducto">
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductoModal;