import { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Form,
  Button,
  Row,
  Col,
  Badge,
  Dropdown,
} from "react-bootstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../styles/menu.css";
import LOGO from "../../assets/ESSENZIA.png";
import Login from "../pages/Login.jsx";

import { useAuth } from "../../context/AuthContext";
import { useCarrito } from "../../context/CarritoContext";

const NAV_LINKS = [
  { to: "/", text: "Inicio" },
  { to: "/productos", text: "Productos" },
  { to: "/contacto", text: "Consultanos" },
];

// 🔐 constante de rol (clave)
const ROL_ADMIN = "Administrador";

function Menu() {
  const { user, logout } = useAuth();
  const { cantidadTotal } = useCarrito();

  const [showLogin, setShowLogin] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const esAdmin = user?.rol === ROL_ADMIN;

  return (
    <>
      <Navbar
        expand="lg"
        variant="dark"
        sticky="top"
        expanded={expanded}
        className="navbar-modern py-2"
      >
        <Container>
          {/* MOBILE HEADER */}
          <div className="d-flex d-lg-none w-100 justify-content-between align-items-center">
            <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
              <img src={LOGO} alt="Esenzia Logo" height="40" />
            </Navbar.Brand>

            <div className="d-flex gap-3 align-items-center">
              <Link
                to="/carrito"
                className="nav-icon-link fs-4 position-relative"
              >
                <i className="bi bi-cart3"></i>
                {cantidadTotal > 0 && (
                  <Badge
                    bg="success"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "0.6rem" }}
                  >
                    {cantidadTotal}
                  </Badge>
                )}
              </Link>

              <Navbar.Toggle
                className="border-0 p-0"
                onClick={() => setExpanded(expanded ? false : "expanded")}
              />
            </div>
          </div>

          {/* DESKTOP HEADER */}
          <Row className="d-none d-lg-flex w-100 align-items-center m-0">
            <Col lg={3} className="p-0">
              <Navbar.Brand as={Link} to="/">
                <img src={LOGO} alt="Esenzia Logo" height="50" />
              </Navbar.Brand>
            </Col>

            <Col lg={6} className="px-3">
              <SearchBar />
            </Col>

            <Col
              lg={3}
              className="d-flex justify-content-end align-items-center gap-3 p-0"
            >
              {user ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="transparent"
                    className="btn-login-modern border-0 d-flex align-items-center gap-2 text-white"
                  >
                    <i className="bi bi-person-circle fs-5"></i>
                    <span
                      className="text-truncate"
                      style={{ maxWidth: "150px" }}
                    >
                      {esAdmin ? "Administrador" : `Hola, ${user.nombre}`}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    align="end"
                    className="shadow border-0 rounded-3 mt-2"
                  >
                    <Dropdown.Header>Mi Cuenta</Dropdown.Header>

                    {esAdmin && (
                      <Dropdown.Item as={Link} to="/admin">
                        <i className="bi bi-speedometer2 me-2"></i>
                        Panel Admin
                      </Dropdown.Item>
                    )}

                    <Dropdown.Item
                      onClick={handleLogout}
                      className="text-danger"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  className="btn-login-modern d-flex align-items-center gap-2"
                  onClick={() => setShowLogin(true)}
                >
                  <i className="bi bi-person-fill"></i>
                  <span>Ingresar</span>
                </Button>
              )}

              <Link
                to="/carrito"
                className="nav-icon-link fs-4 position-relative"
              >
                <i className="bi bi-cart3"></i>
                {cantidadTotal > 0 && (
                  <Badge
                    bg="success"
                    pill
                    className="position-absolute top-0 start-100 translate-middle border border-light"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cantidadTotal}
                  </Badge>
                )}
              </Link>
            </Col>
          </Row>

          {/* MOBILE COLLAPSE */}
          <Navbar.Collapse>
            <div className="d-lg-none pt-3 pb-2">
              <SearchBar />

              <Nav className="flex-column gap-2 mb-3">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="nav-link-mobile"
                    onClick={() => setExpanded(false)}
                  >
                    {link.text}
                  </NavLink>
                ))}

                {esAdmin && (
                  <NavLink
                    to="/admin"
                    className="nav-link-mobile text-warning"
                    onClick={() => setExpanded(false)}
                  >
                    Panel de Administración
                  </NavLink>
                )}
              </Nav>

              {user ? (
                <Button
                  variant="outline-light"
                  className="w-100 py-2"
                  onClick={() => {
                    handleLogout();
                    setExpanded(false);
                  }}
                >
                  <i className="bi bi-box-arrow-right"></i>
                  Cerrar Sesión ({user.nombre})
                </Button>
              ) : (
                <Button
                  className="btn-login-modern w-100 py-2"
                  onClick={() => {
                    setShowLogin(true);
                    setExpanded(false);
                  }}
                >
                  <i className="bi bi-person-fill"></i>
                  Ingresar
                </Button>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="lower-navbar d-none d-lg-block shadow-sm">
        <Container>
          <Nav className="justify-content-center gap-5">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className="nav-link-custom">
                {link.text}
              </NavLink>
            ))}
          </Nav>
        </Container>
      </div>

      <Login show={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

function SearchBar() {
  return (
    <Form className="search-wrapper w-100">
      <i className="bi bi-search search-icon"></i>
      <input
        type="text"
        className="search-input w-100"
        placeholder="Buscar productos..."
      />
    </Form>
  );
}

export default Menu;
