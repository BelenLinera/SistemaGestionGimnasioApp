import React, { useContext } from "react";
import "./Footer.css";
import { ThemeContext } from "../../Context/ThemeContext";

const Footer = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <footer className={theme === "dark" ? 'footer-dark' : 'footer-light'}>
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
