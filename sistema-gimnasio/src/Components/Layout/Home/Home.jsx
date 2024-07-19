import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import "./Home.css";
import CardActivity from "../../Shared/CardEntity/CardActivity";
import { getAllActivities } from "../../Activity/ActivityServices";
import { UseAxiosLoader } from "../../../Hooks/UseAxiosLoader";
import { ThemeContext } from "../../Context/ThemeContext";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

const Home = ({ isAdmin }) => {
  const [activities, setActivities] = useState([]);
  const [changes, setChanges] = useState(false);
  const { loading, sendRequest } = UseAxiosLoader();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getAllActivities(sendRequest);
        if (response.data && Array.isArray(response.data)) {
          setActivities(response.data);
        } else {
          setActivities([]);
        }
      } catch (error) {
        toast.error("Error al traer las actividades");
      }
    };
    fetchActivities();
  }, [changes, sendRequest]);

  return (
    <div className={theme === "dark" ? "home-dark" : "home-light"}>
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
      <div className={theme === "dark" ? "home-act-dark" : "home-act-light"}>
        <h2>Nuestras Actividades</h2>
        {loading && (
          <div className="spinner-container">
            <Spinner animation="border" />
          </div>
        )}
        <div className="activities-container-card">
          {activities && activities.length > 0
            ? activities.map((activity) => (
                <CardActivity
                  key={activity.activityName}
                  entity={activity}
                  type="actividad"
                  setChanges={setChanges}
                  changes={changes}
                  isAdmin={isAdmin}
                />
              ))
            : loading === false && <p>No hay actividades disponibles</p>}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Home;
