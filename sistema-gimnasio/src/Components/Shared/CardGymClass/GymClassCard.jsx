import React from "react";
import { Button } from "react-bootstrap";
import { deleteGymClass } from "../../GymClass/GymClassServices";
import "./GymClassCard.css";

const CardGymClass = ({ entity, setChanges, changes }) => {
  const handleDelete = async () => {
    try {
      await deleteGymClass(entity.idGymClass);
      setChanges(!changes);
    } catch (error) {
      console.error("Failed to delete gym class", error);
    }
  };

  return (
    <div className="card-gymclass">
      <h5 className="card-title">
        {entity.trainerActivity.activity.activityName}
      </h5>
      <p>
        <strong>Entrenador:</strong> {entity.trainerActivity.trainer.name}{" "}
        {entity.trainerActivity.trainer.lastName}<br />
        <strong>Día:</strong> {entity.dayName} <br />
        <strong>Horario:</strong> {entity.timeClass} <br />
        <strong>Cupo:</strong> {entity.capacity}
      </p>
      <Button variant="danger" onClick={handleDelete}>
        Eliminar
      </Button>
    </div>
  );
};

export default CardGymClass;
