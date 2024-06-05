import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-columns">
        <div className="footer-column">
          <p>Direccion: Santa Fe 1100</p>
        </div>
        <div className="footer-column">
          <p>Contacto: trainingcenter@gmail.com</p>
        </div>
        <div className="footer-column">
          <p>© Derechos reservados 2023-2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
