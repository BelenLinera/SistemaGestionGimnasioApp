import React, { useState, useEffect } from "react";
import "./Home.css";
import CardActivity from "../../Shared/CardEntity/CardActivity";
import { getAllActivities } from "../../Activity/ActivityServices";
import { ThemeContext } from "../../Context/ThemeContext";
import { useContext } from "react";

const Home = ({ isAdmin }) => { 
  const [activities, setActivities] = useState([]);
  const [changes, setChanges] = useState(false);
  const {theme} = useContext(ThemeContext)

  useEffect(() => {
    getAllActivities()
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setActivities(response.data);
        } else {
          setActivities([]);
        }
      })
      .catch(error => {
        console.error("Error fetching activities:", error);
      });
  }, [changes]);

  return (
    <div className={theme === "dark" ? 'home-dark' : 'home-light'}>
      <div className="home-header">
        <div className="home-content">
          <h1>Bienvenido/a a Training Center</h1>
          <p>
            En Training Center, tu bienestar y condición física 
            son nuestra prioridad. Nuestro gimnasio, equipado con 
            tecnología de última generación, está diseñado para 
            ofrecerte la mejor experiencia de entrenamiento. 
            Nuestro equipo de entrenadores 
            capacitados está comprometido en ayudarte a alcanzar tus objetivos 
            a través de programas adaptados a tus necesidades.
          </p>
          
        </div>
      </div>
      <div className={theme === "dark" ? 'home-act-dark' : 'home-act-light'}>
        <h2>Nuestras Actividades</h2>
        <div className="activities-container-card">
        {activities && activities.length > 0 ? (
          activities.map(activity => (
            <CardActivity 
              key={activity.activityName} 
              entity={activity} 
              type="actividad" 
              setChanges={setChanges}
              changes={changes}
              isAdmin={isAdmin} 
            />
          ))
        ) : (
          <p>No hay actividades disponibles</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default Home;
