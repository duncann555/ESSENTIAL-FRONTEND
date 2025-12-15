import { useState } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
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

  const handleLogout = () => {
    setUsuarioLogueado(false);
    navigate("/", { replace: true });
  };

  const lowerLinkClass = ({ isActive }) =>
    `lower-link ${isActive ? "active-lower" : ""}`;

  return (
    <>
      {/* =======================
          NAVBAR SUPERIOR
      ======================= */}
      <Navbar sticky="top" className="navbar-custom shadow-sm">
        <Container>
          <div className="row w-100 align-items-center g-2">
            {/* IZQUIERDA — LOGO */}
            <div className="col-6 col-md-3 d-flex align-items-center">
              <Navbar.Brand
                as={Link}
                to="/"
                className="d-flex align-items-center m-0"
              >
                <img
                  src={logo}
                  alt="Flor & Life logo"
                  className="logo-navbar me-2 shadow-sm d-block"
                />
              </Navbar.Brand>
            </div>

            {/* CENTRO — BUSCADOR (desktop) */}
            <div className="col-md-6 d-none d-md-flex justify-content-center">
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

            {/* DERECHA — LOGIN/ADMIN + CARRITO */}
            <div className="col-6 col-md-3 d-flex justify-content-end align-items-center gap-2">
              {usuarioLogueado ? (
                <>
                  <NavLink to="/admin" className="text-decoration-none">
                    <Button variant="warning" className="fw-semibold">
                      Admin
                    </Button>
                  </NavLink>

                  <Button variant="outline-light" onClick={handleLogout}>
                    Salir
                  </Button>
                </>
              ) : (
                <button
                  className="btn-login-modern"
                  onClick={handleShowLogin}
                  type="button"
                  aria-label="Ingresar"
                >
                  <i className="bi bi-person" />
                  <span className="d-none d-lg-inline ms-1">Ingresar</span>
                </button>
              )}

              <NavLink
                to="/carrito"
                className="nav-icon-button"
                aria-label="Carrito"
              >
                <i className="bi bi-cart3" />
              </NavLink>
            </div>

            {/* BUSCADOR (mobile) */}
            <div className="col-12 d-md-none">
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
          </div>
        </Container>
      </Navbar>

      {/* =======================
          NAVBAR INFERIOR
      ======================= */}
      <div className="lower-navbar">
        <Container className="d-flex gap-4 justify-content-center lower-nav-inner">
          <NavLink to="/" className={lowerLinkClass}>
            Inicio
          </NavLink>
          <NavLink to="/productos" className={lowerLinkClass}>
            Productos
          </NavLink>
          <NavLink to="/contacto" className={lowerLinkClass}>
            Contactanos
          </NavLink>
        </Container>
      </div>

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
