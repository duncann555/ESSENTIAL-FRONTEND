import { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo2.png";
import "../styles/menu.css";

import Login from "../Components/Login.jsx";
import Register from "../Components/Registro.jsx";

function Menu({ usuarioLogueado, setUsuarioLogueado }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  const navigate = useNavigate();

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

  const manejarEnvio = (e) => {
    e.preventDefault();
    const q = busqueda.trim();
    if (!q) return;

    navigate(`/filtro?nombre=${encodeURIComponent(q)}`);
    setBusqueda("");
  };

  return (
    <>
      <Navbar expand="lg" sticky="top" collapseOnSelect className="navbar-custom">
        <Container className="d-flex align-items-center gap-3">
          {/* LOGO */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center flex-shrink-0 m-0"
          >
            <img
              src={logo}
              alt="Flor & Life logo"
              className="logo-navbar me-2 shadow-sm d-block"
            />
          </Navbar.Brand>

          {/* BUSCADOR (DESKTOP) centrado */}
          <div className="d-none d-lg-flex flex-grow-1 justify-content-center px-3">
            <form
              onSubmit={manejarEnvio}
              role="search"
              className="search-wrapper w-100"
            >
              <i className="bi bi-search search-icon" />
              <div className="search-floating w-100">
                <input
                  type="search"
                  className="search-input"
                  placeholder="Buscar por producto y categoría"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  aria-label="Buscar productos"
                />
                <span className="search-label">Buscar productos</span>
              </div>
            </form>
          </div>

          {/* TOGGLE (MOBILE) */}
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0 ms-auto d-lg-none"
          />

          <Navbar.Collapse id="basic-navbar-nav" className="flex-lg-grow-0">
            {/* BUSCADOR (MOBILE) */}
            <div className="d-lg-none w-100 my-2">
              <form
                onSubmit={manejarEnvio}
                role="search"
                className="search-wrapper w-100"
              >
                <i className="bi bi-search search-icon" />
                <div className="search-floating w-100">
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Buscar por producto y categoría"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    aria-label="Buscar productos"
                  />
                  <span className="search-label">Buscar productos</span>
                </div>
              </form>
            </div>

            {/* LINKS */}
            <Nav className="ms-lg-auto d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-2 mt-lg-0">
              <NavLink to="/" className="nav-link">Inicio</NavLink>
              <NavLink to="/productos" className="nav-link">Productos</NavLink>
              <NavLink to="/contacto" className="nav-link">Contacto</NavLink>

              {usuarioLogueado ? (
                <>
                  <NavLink to="/admin">
                    <Button variant="warning" className="fw-semibold me-lg-2">
                      Administrador
                    </Button>
                  </NavLink>

                  <Button variant="outline-light" onClick={() => setUsuarioLogueado(false)}>
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <button
                  className="btn-login-modern ms-lg-2"
                  onClick={handleShowLogin}
                  type="button"
                  aria-label="Ingresar"
                >
                  <i className="bi bi-person" />
                  <span className="d-none d-lg-inline ms-1">Ingresar</span>
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* MODALES */}
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
