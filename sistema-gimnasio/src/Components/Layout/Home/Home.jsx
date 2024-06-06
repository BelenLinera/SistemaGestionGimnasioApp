// components/Home.js
import React, { useContext, useRef } from "react";
import UserContext from "../../Context/UserContext";
import { Link } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";

const Home = () => {
  const homeRef = useRef();
  const { user } = useContext(UserContext);

  const showHomeNav = () => {
    homeRef.current.classList.toggle("responsive_home");
  };

  return (
    <div className="home-container">
      <div className="icon">
        <FontAwesomeIcon icon={faUser} color="#000000" />
        <h2>Hola, {user?.name}</h2>
      </div>

      <nav ref={homeRef} className="home-nav">
        <Link to="/editUser" className="link-home" onClick={showHomeNav}>
          MI CUENTA
        </Link>
        <br />
        <Link to="/reservesUser" className="link-home" onClick={showHomeNav}>
          MIS RESERVAS
        </Link>
        <br />
        <Link to="/gymclass" className="link-home" onClick={showHomeNav}>
          CLASES
        </Link>
        <br />
        <Link to="/Activity" className="link-home" onClick={showHomeNav}>
          ACTIVIDADES
        </Link>
        <br />
        <Link to="/formMail" className="link-home" onClick={showHomeNav}>
          CONTÁCTANOS
        </Link>
      </nav>
    </div>
  );
};

export default Home;
