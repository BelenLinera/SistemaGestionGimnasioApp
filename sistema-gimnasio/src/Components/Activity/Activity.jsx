import React, { useState, useEffect } from "react";
import { getAllActivities } from "./ActivityServices";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Activity.css";
import CardActivity from "../Shared/CardEntity/CardActivity";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [changes, setChanges] = useState([]);
  const { loading, sendRequest } = UseAxiosLoader();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await getAllActivities(sendRequest);
        console.log(response);
        setActivities(response.data);
      } catch (error) {
        console.log("Error al traer las actividades", error);
      }
    };

    fetchActivities();
    // getAllActivities().then((response) => {
    //   setActivities(response.data);
    // });
  }, [changes, sendRequest]);
  return (
    <section className="activity-section">
      <h2>ACTIVIDADES</h2>
      <Link to="/activity/create-activity">
        <Button variant="light" className="button-activity">
          + Nueva actividad
        </Button>
      </Link>
      {loading && <p>Loading...</p>}
      {activities.map((activity) => (
        <CardActivity
          entity={activity}
          type={"activity"}
          key={activity.activityName}
          setChanges={setChanges}
          changes={changes}
        />
      ))}
    </section>
  );
};

export default Activity;
