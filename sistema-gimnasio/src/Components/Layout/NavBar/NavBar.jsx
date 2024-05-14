import React from "react";
import { useRef } from "react";
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
      <img src="/assets/logo-simple2.png" alt="logo" className="logo-image" />
      <nav ref={navRef}>
        <a href="/#">HOME</a>
        <a href="/#">ENTRENADORES</a>
        <a href="/#">CLASES</a>
        <a href="/#">ACTIVIDADES</a>
        <a href="/#">CLIENTES</a>
        <a href="/#">ADMINS</a>
        <a href="/#">EDITAR PERFIL</a>
        <button className="nav-btn nav-close-btn" onClick={showNavBar}>
          <FontAwesomeIcon icon={faXmark} color="#11999e" />
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
