import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Home.css";
import CardActivity from "../../Shared/CardEntity/CardActivity";
import { getAllActivities } from "../../Activity/ActivityServices";
import { UseAxiosLoader } from "../../../Hooks/UseAxiosLoader";

const Home = ({ isAdmin }) => {
  const [activities, setActivities] = useState([]);
  const [changes, setChanges] = useState(false);
  const { loading, sendRequest } = UseAxiosLoader();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getAllActivities(sendRequest);
        console.log(response);
        if (response.data && Array.isArray(response.data)) {
          setActivities(response.data);
        } else {
          setActivities([]);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();

    // getAllActivities()
    //   .then((response) => {
    //     if (response.data && Array.isArray(response.data)) {
    //       setActivities(response.data);
    //     } else {
    //       setActivities([]);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching activities:", error);
    //   });
  }, [changes, sendRequest]);

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-content">
          <h1>Bienvenido/a a Training Center</h1>
          <p>
            En Training Center, tu bienestar y condición física son nuestra
            prioridad. Nuestro gimnasio, equipado con tecnología de última
            generación, está diseñado para ofrecerte la mejor experiencia de
            entrenamiento. Nuestro equipo de entrenadores capacitados está
            comprometido en ayudarte a alcanzar tus objetivos a través de
            programas adaptados a tus necesidades.
          </p>
        </div>
      </div>
      <div className="activities-container">
        <h2>Nuestras Actividades</h2>
        <div className="activities-container-card">
          {loading && <Spinner animation="border" />}
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
              <CardActivity
                key={activity.activityName}
                entity={activity}
                type="actividad"
                setChanges={setChanges}
                changes={changes}
                isAdmin={isAdmin}
              />
            ))
          ) : loading === false && (
            <p>No hay actividades disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
