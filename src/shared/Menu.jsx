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
      <Navbar expand="lg" className="navbar-custom" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            {logo && (
              <img
                src={logo}
                alt="Esencia logo"
                className="logo-navbar me-2 shadow-sm"
              />
            )}
          </Navbar.Brand>

          {/* BUSCADOR (DESKTOP) */}
          <div className="d-none d-lg-flex flex-grow-1 justify-content-center">
            <form onSubmit={manejarEnvio} className="search-wrapper w-100" role="search">
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

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* BUSCADOR (MOBILE) */}
            <div className="d-lg-none w-100 my-2">
              <form onSubmit={manejarEnvio} className="search-wrapper w-100" role="search">
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

            <Nav className="ms-auto align-items-center gap-2">
              <NavLink to="/" className="nav-link">Inicio</NavLink>
              <NavLink to="/productos" className="nav-link">Productos</NavLink>
              <NavLink to="/nosotros" className="nav-link">Sobre Nosotros</NavLink>
              <NavLink to="/contacto" className="nav-link">Contacto</NavLink>

              {usuarioLogueado ? (
                <>
                  <NavLink to="/admin">
                    <Button variant="warning" className="fw-semibold me-2">
                      Administrador
                    </Button>
                  </NavLink>
                  <Button
                    variant="outline-light"
                    onClick={() => setUsuarioLogueado(false)}
                  >
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <Button
                  variant="warning"
                  onClick={handleShowLogin}
                  className="d-flex align-items-center gap-2 fw-semibold btn-primary"
                  aria-label="Iniciar sesión"
                >
                  <i className="bi bi-person-circle fs-5" />
                  <span className="d-none d-sm-inline">Iniciar sesión</span>
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
