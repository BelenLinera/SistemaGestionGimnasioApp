import React, { useState, useEffect, useContext } from "react";
import { getAllActivities } from "./ActivityServices";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";
import { Link } from "react-router-dom";
import "./Activity.css";
import CardActivity from "../Shared/CardEntity/CardActivity";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext } from "../Context/ThemeContext";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [changes, setChanges] = useState([]);
  const [toastModal, setToast] = useState({
    message: null,
    display: false,
    error: false,
  });
  const { theme } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const { loading, sendRequest } = UseAxiosLoader();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getAllActivities(sendRequest);
        setActivities(response.data);
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    fetchActivities();
  }, [changes, sendRequest]);
  useEffect(() => {
    if (toastModal.display === true && toastModal.error === false) {
      toast.success(toastModal.message);
    } else if (toastModal.display === true && toastModal.error === true) {
      toast.error("No se puede eliminar actividades asociadas a una clase");
    }
  }, [toastModal]);

  return (
    <section className="activity-section">
      <h2>ACTIVIDADES</h2>
      {user?.role === "Admin" && (
        <Link to="/activity/create-activity">
          <Button
            variant="light"
            className={
              theme === "dark"
                ? "button-activity-dark"
                : "button-activity-light"
            }
          >
            + Nueva actividad
          </Button>
        </Link>
      )}
      {loading && (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      )}
      <div className="activity-container-card">
        {activities.map((activity) => (
          <CardActivity
            entity={activity}
            type={"activity"}
            key={activity.activityName}
            setToast={setToast}
            setChanges={setChanges}
            changes={changes}
          />
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Activity;
