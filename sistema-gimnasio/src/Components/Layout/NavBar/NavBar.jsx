import React from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavBar.css";

const NavBar = () => {
  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <button className="nav-btn" onClick={showNavBar}>
        <FontAwesomeIcon icon={faBars} color="#11999e" />
      </button>
      <Link to="/">
        <img src="/assets/logo-simple2.png" alt="logo" className="logo-image" />
      </Link>
      <nav ref={navRef}>
        <Link to="/" className="link-nav" onClick={showNavBar}>
          HOME
        </Link>
        <Link to="/trainer" className="link-nav" onClick={showNavBar}>
          ENTRENADORES
        </Link>
        <Link to="/" className="link-nav" onClick={showNavBar}>
          CLASES
        </Link>
        <Link to="/" className="link-nav" onClick={showNavBar}>
          ACTIVIDADES
        </Link>
        <Link to="/client" className="link-nav" onClick={showNavBar}>
          CLIENTES
        </Link>
        <Link to="/admin" className="link-nav" onClick={showNavBar}>
          ADMINS
        </Link>
        <Link to="" className="link-nav" onClick={showNavBar}>
          EDITAR PERFIL
        </Link>
        <button className="nav-btn nav-close-btn" onClick={showNavBar}>
          <FontAwesomeIcon icon={faXmark} color="#11999e" />
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
