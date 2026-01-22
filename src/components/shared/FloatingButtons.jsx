import "../../styles/floating.css";

const FloatingButtons = () => {
  return (
    <div className="floating-container">
      {/* Botón WhatsApp (Único flotante) */}
      <a 
        href="https://wa.me/5493811234567" // Tu número
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn-float whatsapp shadow"
        title="Consultanos por WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
    </div>
  );
};

export default FloatingButtons;