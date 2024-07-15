// ActivityFilter.js
import React from "react";
import { Form } from "react-bootstrap";

const ActivityFilter = ({ activities, selectedActivity, onActivityChange }) => {
  return (
    <Form.Group controlId="activityFilter">
      <Form.Label>Filtrar por Actividad</Form.Label>
      <Form.Control
        as="select"
        value={selectedActivity}
        onChange={(e) => onActivityChange(e.target.value)}
      >
        <option value="">Todas las Actividades</option>
        {activities.map((activity) => (
          <option key={activity.value} value={activity.value}>
            {activity.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default ActivityFilter;
