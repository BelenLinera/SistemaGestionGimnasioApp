// components/Home.js
import React, { useContext, useRef } from "react";
import UserContext from '../../Context/UserContext';
import { Link } from "react-router-dom";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";

const Home = () => {
  const homeRef = useRef();
  const { user } = useContext(UserContext);

  const showHomeNav = () => {
    homeRef.current.classList.toggle("responsive_home");
  };

  return (
      <body>
        <div className="icon">
          <FontAwesomeIcon icon={faUser} color="#000000" />
          <h2>Hola {user?.userName}</h2>
        </div>
        
        <nav ref={homeRef}>
            <Link to="/editUser" className="link-home" onClick={showHomeNav}>
              Mi cuenta
            </Link>
            <br/>
            <Link to="/reservesUser" className="link-home" onClick={showHomeNav}>
              Mis reservas
            </Link>
            <br/>
            <Link to="/gymclass" className="link-home" onClick={showHomeNav}>
              Clases
            </Link>
            <br/>
            <Link to="/Activity" className="link-home" onClick={showHomeNav}>
              Actividades
            </Link>
            <br/>
            <Link to="/formMail" className="link-home" onClick={showHomeNav}>
              Contáctanos
            </Link>
          
          </nav>
        <div>{user?.email}</div>
      </body>
    
  );
};

export default Home;
