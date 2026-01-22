import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import LOGO from "../../assets/ESSENZIA.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section mt-auto">
      
      {/* Línea decorativa superior */}
      <div className="footer-top-border"></div>

      <Container className="pt-5 pb-4">
        <Row className="gy-4">
          
          {/* COLUMNA 1: MARCA Y SOBRE NOSOTROS */}
          <Col xs={12} md={4} className="text-center text-md-start">
            <Link to="/">
              <img src={LOGO} alt="Esenzia Logo" className="footer-logo mb-3" />
            </Link>
            <p className="footer-text">
              Volvé a lo natural. Productos seleccionados para tu bienestar físico y emocional, elaborados con consciencia y pureza.
            </p>
          </Col>

          {/* COLUMNA 2: NAVEGACIÓN RÁPIDA */}
          <Col xs={12} md={4} className="text-center text-md-start">
            <h5 className="footer-heading">Explorar</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/productos">Tienda Online</Link></li>
              <li><Link to="/nosotros">Nuestra Historia</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link></li>
            </ul>
          </Col>

          {/* COLUMNA 3: CONTACTO */}
          <Col xs={12} md={4} className="text-center text-md-start">
            <h5 className="footer-heading">Contacto</h5>
            
            <p className="footer-contact-item">
              <i className="bi bi-whatsapp me-2 icon-brand"></i> 
              +54 3456 6734560
            </p>
            <p className="footer-contact-item">
              <i className="bi bi-envelope-fill me-2 icon-brand"></i> 
              contacto@esenzia.com
            </p>
            <p className="footer-contact-item">
              <i className="bi bi-geo-alt-fill me-2 icon-brand"></i> 
              Tucumán, Argentina
            </p>

            <div className="footer-socials mt-3 justify-content-center justify-content-md-start">
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
              <a href="#" aria-label="WhatsApp"><i className="bi bi-whatsapp"></i></a>
            </div>
          </Col>

        </Row>
      </Container>

      {/* COPYRIGHT */}
      <div className="footer-bottom py-3 text-center">
        <small>
          © {currentYear} <strong>ESENZIA</strong> · Todos los derechos reservados.
        </small>
      </div>
    </footer>
  );
};

export default Footer;