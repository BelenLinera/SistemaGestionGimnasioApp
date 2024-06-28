import React, { useState, useEffect, useContext } from 'react'
import { getAllActivities } from './ActivityServices';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./Activity.css";
import CardActivity from '../Shared/CardEntity/CardActivity';
import { ThemeContext } from '../Context/ThemeContext';


const Activity = () => {
    const [activities, setActivities] = useState([]);
    const {theme} = useContext(ThemeContext)
    const [changes, setChanges] = useState([]);
    useEffect(() => {
        getAllActivities().then((response) => {
            setActivities(response.data);
        });
    }, [changes]);
  return (
    <section className="activity-section">
        <h2>ACTIVIDADES</h2>
        <Link to="/activity/create-activity">
            <Button variant="light" className={theme === "dark" ? 'button-activity-dark' : 'button-activity-light'}>
                + Nueva actividad
            </Button>
        </Link>
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