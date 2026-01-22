import { useEffect } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";

function UsuarioModal({
  show,
  modoUsuario,
  usuarioForm,
  cerrarModalUsuario,
  handleGuardarUsuario,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: usuarioForm,
  });

  // Efecto para cargar los datos cuando se edita o limpiar cuando se crea
  useEffect(() => {
    reset(usuarioForm);
  }, [usuarioForm, reset]);

  const onSubmit = (data) => {
    handleGuardarUsuario(data);
  };

  return (
    <Modal show={show} onHide={cerrarModalUsuario} centered backdrop="static">
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold text-dark">
          {modoUsuario === "crear" ? "Agregar Usuario" : "Editar Usuario"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-4">
        <Form id="formUsuario" onSubmit={handleSubmit(onSubmit)}>
          
          {/* NOMBRE */}
          <FloatingLabel controlId="nombre" label="Nombre completo" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Ej: Juan Pérez"
              isInvalid={!!errors.nombre}
              {...register("nombre", {
                required: "El nombre es obligatorio",
                minLength: {
                  value: 3,
                  message: "Mínimo 3 caracteres",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre?.message}
            </Form.Control.Feedback>
          </FloatingLabel>

          {/* EMAIL */}
          <FloatingLabel controlId="email" label="Correo electrónico" className="mb-3">
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              isInvalid={!!errors.email}
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Ingresá un email válido",
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </FloatingLabel>

          {/* ROL */}
          <FloatingLabel controlId="rol" label="Rol del usuario" className="mb-3">
            <Form.Select
              isInvalid={!!errors.rol}
              {...register("rol", {
                required: "Seleccioná un rol",
              })}
            >
              <option value="">Seleccionar rol...</option>
              <option value="admin">Administrador</option>
              <option value="usuario">Usuario</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.rol?.message}
            </Form.Control.Feedback>
          </FloatingLabel>

          {/* ESTADO */}
          <FloatingLabel controlId="estado" label="Estado de la cuenta" className="mb-3">
            <Form.Select
              isInvalid={!!errors.estado}
              {...register("estado", {
                required: "Seleccioná un estado",
              })}
            >
              <option value="Activo">Activo</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Suspendido">Suspendido</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.estado?.message}
            </Form.Control.Feedback>
          </FloatingLabel>

        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0 pt-0 pb-4">
        <Button 
          variant="outline-secondary" 
          onClick={cerrarModalUsuario}
          className="rounded-pill px-4"
        >
          Cancelar
        </Button>
        <Button
          className="btn-admin-primary rounded-pill px-4"
          type="submit"
          form="formUsuario"
        >
          {modoUsuario === "crear" ? "Crear Usuario" : "Guardar Cambios"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UsuarioModal;