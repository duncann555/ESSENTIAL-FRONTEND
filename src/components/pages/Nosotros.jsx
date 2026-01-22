// src/components/pages/Nosotros.jsx
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/nosotros.css";

// Si tenés logo, joya. Si no, no pasa nada.

export default function Nosotros() {
  return (
    <div className="nosotros-wrapper">
      <Container className="py-4">
        {/* HERO */}
        <section className="nosotros-hero mb-5">
          <Row className="align-items-center g-4">
            <Col xs={12} md={6}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <img
                  src={logo}
                  alt="ViciAR"
                  className="nosotros-logo"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div>
                  <h1 className="fw-bold mb-1">
                    Somos <span className="texto-resaltado">ViciAR</span>
                  </h1>
                  <div className="d-flex flex-wrap gap-2">
                    <Badge bg="dark">Juegos</Badge>
                    <Badge bg="dark">Consolas</Badge>
                    <Badge bg="dark">Accesorios</Badge>
                    <Badge bg="dark">PC Gaming</Badge>
                  </div>
                </div>
              </div>

              <p className="fs-5 text-muted mb-3">
                ViciAR es una tienda pensada para gamers que quieren comprar bien,
                rápido y sin vueltas. Seleccionamos productos que realmente valen
                la pena y tratamos la experiencia de compra como parte del juego.
              </p>

              <div className="d-flex gap-2 flex-wrap">
                <Button as={Link} to="/productos" className="px-4">
                  Ver catálogo
                </Button>
                <Button
                  as={Link}
                  to="/contacto"
                  variant="outline-secondary"
                  className="px-4"
                >
                  Contactanos
                </Button>
              </div>
            </Col>

            <Col xs={12} md={6}>
              <Card className="nosotros-card-highlight">
                <Card.Body>
                  <h4 className="fw-bold mb-3">Nuestra promesa</h4>
                  <ul className="nosotros-lista mb-0">
                    <li>Productos curados para cada plataforma.</li>
                    <li>Stock y estados claros.</li>
                    <li>Soporte real antes y después de comprar.</li>
                    <li>Experiencia simple, sin laberintos.</li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* QUÉ HACEMOS / CÓMO ELEGIMOS / PARA QUIÉN */}
        <section className="mb-5">
          <Row className="g-4">
            <Col xs={12} md={4}>
              <Card className="h-100 nosotros-card">
                <Card.Body>
                  <h5 className="fw-bold">Qué hacemos</h5>
                  <p className="text-muted mb-0">
                    Vendemos juegos, consolas, periféricos y equipos pensados
                    para jugar cómodo. Nada de catálogo inflado sin sentido.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="h-100 nosotros-card">
                <Card.Body>
                  <h5 className="fw-bold">Cómo elegimos</h5>
                  <p className="text-muted mb-0">
                    Priorizamos calidad, reputación y relación precio/rendimiento.
                    Si un producto es humo, no entra.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={4}>
              <Card className="h-100 nosotros-card">
                <Card.Body>
                  <h5 className="fw-bold">Para quién es</h5>
                  <p className="text-muted mb-0">
                    Para el casual, el competitivo y el que arma su primer setup.
                    Acá nadie te juzga por tu backlog.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* VALORES */}
        <section className="mb-5">
          <div className="mb-3">
            <h3 className="fw-bold">Nuestros valores</h3>
            <p className="text-muted mb-0">
              Lo que no negociamos como marca.
            </p>
          </div>

          <Row className="g-4">
            <Col xs={12} md={6} lg={3}>
              <Card className="h-100 nosotros-card">
                <Card.Body>
                  <h6 className="fw-bold">Transparencia</h6>
                  <p className="text-muted mb-0">
                    Precios claros y comunicación directa.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Card className="h-100 nosotros-card">
                <Card.Body>
                  <h6 className="fw-bold">Comunidad</h6>
                  <p className="text-muted mb-0">
                    Escuchamos feedback y mejoramos rápido.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Card className="h-100 nosotros-card">
                <Card.Body>
                  <h6 className="fw-bold">Calidad</h6>
                  <p className="text-muted mb-0">
                    Menos relleno, más productos que sí valen.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col xs={12} md={6} lg={3}>
              <Card className="h-100 nosotros-card">
                <Card.Body>
                  <h6 className="fw-bold">Experiencia</h6>
                  <p className="text-muted mb-0">
                    Comprar tiene que ser fácil y agradable.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>

        {/* CTA FINAL */}
        <section className="nosotros-cta">
          <Card className="nosotros-card-cta">
            <Card.Body className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
              <div>
                <h4 className="fw-bold mb-1">¿Listo para viciar bien?</h4>
                <p className="text-muted mb-0">
                  Explorá el catálogo y encontrá lo tuyo en dos clicks.
                </p>
              </div>
              <div className="d-flex gap-2">
                <Button as={Link} to="/productos">
                  Ir a productos
                </Button>
                <Button as={Link} to="/carrito" variant="outline-secondary">
                  Ver carrito
                </Button>
              </div>
            </Card.Body>
          </Card>
        </section>
      </Container>
    </div>
  );
}
