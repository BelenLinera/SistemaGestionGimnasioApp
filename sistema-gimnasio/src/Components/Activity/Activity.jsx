import React, { useState, useEffect } from "react";
import { getAllActivities } from "./ActivityServices";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Activity.css";
import CardActivity from "../Shared/CardEntity/CardActivity";
import { toast, ToastContainer } from "react-toastify";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [changes, setChanges] = useState([]);
  const [toastModal, setToast] = useState({
    message: null,
    display: false,
    error: false,
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const getActivities = async () => {
    try {
      const response = await getAllActivities();
      setActivities(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    if (toastModal.display === true && toastModal.error === false) {
      toast.success(toastModal.message);
    } else if (toastModal.display === true && toastModal.error === true) {
      toast.error("No se puede eliminar actividades asociadas a una clase");
    }
  }, [toastModal]);

  useEffect(() => {
    getActivities();
  }, [changes]);

  return (
    <section className="activity-section">
      <h2>ACTIVIDADES</h2>
      {user.role === "Admin" && (
        <Link to="/activity/create-activity">
          <Button variant="light" className="button-activity">
            + Nueva actividad
          </Button>
        </Link>
      )}
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
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Activity;
