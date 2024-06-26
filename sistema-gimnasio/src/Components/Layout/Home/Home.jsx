import React, { useState, useEffect } from "react";
import "./Home.css";
import CardActivity from "../../Shared/CardEntity/CardActivity";
import { getAllActivities } from "../../Activity/ActivityServices";

const Home = () => {
  const [activities, setActivities] = useState([]);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    getAllActivities()
      .then(response => {
        console.log(response); 
        if (response.data && Array.isArray(response.data.$values)) {
          setActivities(response.data.$values);
        } else {
          setActivities([]);
        }
      })
      .catch(error => {
        console.error("Error fetching activities:", error);
      });
  }, [changes]);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Bienvenido/a a Training Center</h1>
        <p>En Training Center, tu bienestar y condición física 
          son nuestra prioridad. Nuestro gimnasio, equipado con 
          tecnología de última generación, está diseñado para 
          ofrecerte la mejor experiencia de entrenamiento. 
          Nuestro equipo de entrenadores 
          capacitados está comprometido en ayudarte a alcanzar tus objetivos 
          a través de programas adaptados a tus necesidades.
        </p>
        <p>Únete a la familia de Training Center y descubre 
          un ambiente motivador y solidario que transformará
          tu vida. ¡Te esperamos para comenzar juntos este emocionante 
          camino hacia un estilo de vida más saludable!
        </p>
      </div>
      <div className="activities-container">
        <h2>Nuestras Actividades</h2>
        {activities && activities.length > 0 ? (
          activities.map(activity => (
            <CardActivity 
              key={activity.activityName} 
              entity={activity} 
              type="actividad" 
              setChanges={setChanges} 
              changes={changes} 
            />
          ))
        ) : (
          <p>No hay actividades disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Home;
