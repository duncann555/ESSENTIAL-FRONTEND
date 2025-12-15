import { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, Link } from "react-router";
import logo from "../assets/ESSENTIAL.png";
import "../styles/menu.css";
import Login from "../Components/Login.jsx";
import Register from "../Components/Registro.jsx";

function Menu({ usuarioLogueado, setUsuarioLogueado }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleCloseAll = () => {
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <>
      <Navbar expand="lg" className="navbar navbar-custom" sticky="top">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          {logo && (
            <img
              src={logo}
              alt="Bienestar Artesanal logo"
              width="40"
              height="40"
              className="me-2 rounded-circle shadow-sm"
            />
          )}
          <span className="brand-text">Bienestar Artesanal</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Inicio
            </NavLink>

            <NavLink
              to="/productos"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Productos
            </NavLink>

            <NavLink
              to="/nosotros"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Sobre Nosotros
            </NavLink>

            <NavLink
              to="/contacto"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              Contacto
            </NavLink>

            {usuarioLogueado ? (
              <>
                <NavLink to="/admin">
                  <Button className="btn-login-outline me-2">
                    Administrador
                  </Button>
                </NavLink>

                <Button
                  className="btn-login-outline"
                  onClick={() => setUsuarioLogueado(false)}
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button
                onClick={handleShowLogin}
                className="btn-login d-flex align-items-center gap-2 fw-semibold"
                aria-label="Iniciar sesión"
              >
                <i className="bi bi-person-circle fs-5" />
                <span className="d-none d-sm-inline">Iniciar sesión</span>
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Modales */}
      <Login
        show={showLogin}
        handleClose={handleCloseAll}
        handleShowRegister={handleShowRegister}
        setUsuarioLogueado={setUsuarioLogueado}
      />

      <Register
        show={showRegister}
        handleClose={handleCloseAll}
        handleShowLogin={handleShowLogin}
      />
    </>
  );
}

export default Menu;
