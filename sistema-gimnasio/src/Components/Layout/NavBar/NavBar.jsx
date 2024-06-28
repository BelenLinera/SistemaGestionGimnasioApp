import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavBar.css";
import { ThemeContext } from "../../Context/ThemeContext";
import ThemeButton from "../../Context/ThemeButton";

const NavBar = () => {
  const navRef = useRef();
  const { theme } = useContext(ThemeContext);

  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header className={`navbar ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
      <button className="nav-btn" onClick={showNavBar}>
        <FontAwesomeIcon icon={faBars} color="#11999e" />
      </button>
      <Link to="/">
        <img src="/assets/logo-simple2.png" alt="logo" className="logo-image" />
      </Link>
      <nav ref={navRef} className={theme === 'dark' ? 'link-dark' : 'link-light'}>
        <Link to="/" className={`link-nav ${theme === 'dark' ? 'link-dark' : 'link-light'}`} onClick={showNavBar}>
         <p>HOME</p> 
        </Link>
        <Link to="/trainer" className={`link-nav ${theme === 'dark' ? 'link-dark' : 'link-light'}`} onClick={showNavBar}>
          <p>ENTRENADORES</p>
        </Link>
        <Link to="/gym-class" className={`link-nav ${theme === 'dark' ? 'link-dark' : 'link-light'}`} onClick={showNavBar}>
          <p>CLASES</p>
        </Link>
        <Link to="/activity" className={`link-nav ${theme === 'dark' ? 'link-dark' : 'link-light'}`} onClick={showNavBar}>
          <p>ACTIVIDADES</p>
        </Link>
        <Link to="/reserves" className={`link-nav ${theme === 'dark' ? 'link-dark' : 'link-light'}`} onClick={showNavBar}>
         <p> RESERVAS</p>
        </Link>
        <Link to="/my-reserves" className={`link-nav ${theme === 'dark' ? 'link-dark' : 'link-light'}`} onClick={showNavBar}>
        <p>MIS RESERVAS</p>
        </Link>
        <Link to="/client" className={`link-nav ${theme === 'dark' ? 'link-dark' : 'link-light'}`} onClick={showNavBar}>
        <p>CLIENTES</p>
        </Link>
        <Link to="/admin" className={`link-nav ${theme === 'dark' ? 'link-dark' : 'link-light'}`} onClick={showNavBar}>
          <p>ADMINS</p>
        </Link>
        <Link to="" className={`link-nav ${theme === 'dark' ? 'link-dark' : 'link-light'}`} onClick={showNavBar}>
          <p>EDITAR PERFIL</p>
        </Link>
        <button className={`nav-btn nav-close-btn ${theme === 'dark' ? 'btn-dark' : 'btn-light'}`} onClick={showNavBar}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        
      </nav>
      <ThemeButton/>
      
    </header>
  );
};

export default NavBar;
