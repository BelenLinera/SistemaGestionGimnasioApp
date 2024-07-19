// GymClass.js
import React, { useState, useEffect, useContext } from "react";
import { getAllGymClasses } from "./GymClassServices";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import "./GymClass.css";
import CardGymClass from "../Shared/CardGymClass/GymClassCard";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../Context/ThemeContext";
import ActivityFilter from "./ActivityFilter";

const GymClass = () => {
  const { theme } = useContext(ThemeContext);
  const [gymClasses, setGymClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [changes, setChanges] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState("");
  const { loading, sendRequest } = UseAxiosLoader();
  const [toastModal, setToast] = useState({
    message: null,
    display: false,
    error: false,
  });

  useEffect(() => {
    const fetchGymClasses = async () => {
      try {
        const response = await getAllGymClasses(sendRequest);
        setGymClasses(response.data);
        const uniqueActivities = getUniqueActivities(response.data);
        setActivities(uniqueActivities);
      } catch (error) {
        toast.error(error.response.data);
      }
    };

    fetchGymClasses();
  }, [changes, sendRequest]);

  useEffect(() => {
    if (toastModal.display === true && toastModal.error === false) {
      toast.success(toastModal.message);
    } else if (toastModal.display === true && toastModal.error === true) {
      toast.error(toastModal.message);
    }
  }, [toastModal]);

  useEffect(() => {
    filterClassesByActivity(selectedActivity);
  }, [gymClasses, selectedActivity]);

  const getUniqueActivities = (classes) => {
    const activitySet = new Set();
    classes.forEach((gymClass) => {
      activitySet.add(gymClass.trainerActivity.activity.activityName);
    });
    return Array.from(activitySet).map((activityName) => ({
      value: activityName,
      label: activityName,
    }));
  };

  const filterClassesByActivity = (activityName) => {
    if (!activityName) {
      setFilteredClasses(gymClasses);
    } else {
      const filtered = gymClasses.filter(
        (gymClass) =>
          gymClass.trainerActivity.activity.activityName === activityName
      );
      setFilteredClasses(filtered);
    }
  };

  return (
    <section className="gymclass-section">
      <h2>CLASES DEL GIMNASIO</h2>
      <Link to="/gym-class/create-gym-class">
        <Button
          variant="light"
          className={
            theme === "dark" ? "button-gymclass-dark" : "button-gymclass-light"
          }
        >
          + Nueva clase
        </Button>
      </Link>
      <ActivityFilter
        activities={activities}
        selectedActivity={selectedActivity}
        onActivityChange={setSelectedActivity}
      />
      {loading && (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      )}
      {filteredClasses.length === 0 && !loading && (
        <p>No hay actividades disponibles</p>
      )}
      <div className="gymclass-container-card">
        {filteredClasses.map((gymClass) => (
          <CardGymClass
            entity={gymClass}
            type={"gymclass"}
            key={gymClass.idGymClass}
            setChanges={setChanges}
            changes={changes}
            setToast={setToast}
          />
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default GymClass;
