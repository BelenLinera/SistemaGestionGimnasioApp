import React, { useContext } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NavBar.css";
import { Button } from "react-bootstrap";
import UserContext from "../../Context/UserContext";

const NavBar = () => {
  const { logout } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));
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
        <Link to="/activity" className="link-nav" onClick={showNavBar}>
          ACTIVIDADES
        </Link>
        {user?.role === "Admin" && (
          <>
            <Link to="/trainer" className="link-nav" onClick={showNavBar}>
              ENTRENADORES
            </Link>
            <Link to="/gym-class" className="link-nav" onClick={showNavBar}>
              CLASES
            </Link>
            <Link to="/admin" className="link-nav" onClick={showNavBar}>
              ADMINS
            </Link>
            <Link to="/client" className="link-nav" onClick={showNavBar}>
              CLIENTES
            </Link>
          </>
        )}
        {user?.role === "Client" && (
          <Link to="/my-reserves" className="link-nav" onClick={showNavBar}>
            MIS RESERVAS
          </Link>
        )}
        {user?.role && (
          <>
            <Link to="/reserves" className="link-nav" onClick={showNavBar}>
              RESERVAS
            </Link>
            <Link to={`/edit-profile/${user.email}`} className="link-nav" onClick={showNavBar}>
              EDITAR PERFIL
            </Link>
            <Button variant="light" onClick={logout}>LOGOUT</Button>
          </>
        )}
        {!user && (
          <>
            <div className="buttons-login-register">
              <Link to="/login">
                <Button variant="light">LOGIN</Button>
              </Link>
              <Link to="/register">
                <Button variant="light">REGISTRARSE</Button>
              </Link>
            </div>
          </>
        )}
        <button className="nav-btn nav-close-btn" onClick={showNavBar}>
          <FontAwesomeIcon icon={faXmark} color="#11999e" />
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
