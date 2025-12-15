import "../styles/footer.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";

const Footer = () => {
  return (
    <footer className="footer-container mt-auto">
      <div className="footer-top-line" />

      <div className="container py-4">
        <div className="row g-4">
          {/* LOGO + INFO */}
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column">
              <img src={logo} alt="Flor & Life logo" className="footer-logo mb-2" />

              <p className="footer-muted small mb-0">
                Bienestar natural para tu día a día.
                <br />
                Dietarios • Hierbas • Esencias • Aromas
              </p>
            </div>
          </div>

          {/* SECCIONES */}
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column">
              <h5 className="footer-title mb-2">Secciones</h5>

              <nav className="d-flex flex-column gap-1">
                <Link to="/" className="footer-link">Inicio</Link>
                <Link to="/productos" className="footer-link">Productos</Link>
                <Link to="/nosotros" className="footer-link">Nosotros</Link>
                <Link to="/contacto" className="footer-link">Contacto</Link>
                <Link to="/terminos" className="footer-link">Términos & Condiciones</Link>
              </nav>
            </div>
          </div>

          {/* CONTACTO + REDES */}
          <div className="col-12 col-md-4">
            <div className="d-flex flex-column">
              <h5 className="footer-title mb-2">Contacto</h5>

              <div className="d-flex flex-column gap-1">
                <p className="footer-contact mb-0">
                  <i className="bi bi-whatsapp me-2 footer-accent"></i> +54 11 1234-5678
                </p>
                <p className="footer-contact mb-0">
                  <i className="bi bi-envelope-fill me-2 footer-accent"></i> florandlife@gmail.com
                </p>
                <p className="footer-contact mb-2">
                  <i className="bi bi-geo-alt-fill me-2 footer-accent"></i> Argentina
                </p>
              </div>

              <h6 className="footer-title mt-3 mb-2">Seguinos</h6>

              <div className="footer-socials d-flex gap-2">
                <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" aria-label="TikTok"><i className="bi bi-tiktok"></i></a>
                <a href="#" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom text-center small">
        © {new Date().getFullYear()} Flor & Life · Todos los derechos reservados
      </div>
    </footer>
  );
};

export default Footer;
