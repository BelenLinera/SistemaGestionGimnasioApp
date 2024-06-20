import React, { useContext, useEffect } from "react";
import { Button } from "react-bootstrap";
import "./GymClassCard.css";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import { deleteGymClass } from "../../GymClass/GymClassServices";
import { cancelReserve, makeReserve } from "../../Reserve/ReserveService";
import { format, parse } from "date-fns";

const CardGymClass = ({ entity, setChanges, changes, showDay }) => {
  const { user } = useContext(UserContext);

  const handleDelete = async () => {
    try {
      await deleteGymClass(entity.idGymClass);
      setChanges(!changes);
    } catch (error) {
      console.error("Failed to delete gym class", error);
    }
  };

  useEffect(() => {
    console.log(entity);
  }, [entity.reserved]);

  const handleReserve = async () => {
    if (entity.reserved || entity.reserveCount === entity.capacity) {
      return console.log("Capacidad maxima alcanzada");
    }
    try {
      const parsedDate = parse(entity.datetimeString, "dd/MM/yyyy", new Date());
      const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");
      await makeReserve(user.token, {
        IdGymClass: entity.idGymClass,
        dateClass: formattedDate,
      });
      setChanges(!changes);
    } catch (error) {
      console.log("No se pudo hacer la reserva", error);
    }
  };

  const handleCancelReserve = async () => {
    try {
      await cancelReserve(user.token, entity.idReserve);
      setChanges(!changes);
    } catch (error) {
      console.log("No se pudo cancelar la reserva", error);
    }
  };

  return (
    <div className="card-gymclass">
      <h5 className="card-title">
        {entity.trainerActivity.activity.activityName}
      </h5>
      <p>
        <strong>Entrenador:</strong> {entity.trainerActivity.trainer.name}{" "}
        {entity.trainerActivity.trainer.lastName}
        <br />
        <strong>Día:</strong> {entity.dayName} <br />
        <strong>Horario:</strong> {entity.timeClass} <br />
        <strong>Fecha Completa: </strong>
        {showDay && entity.datetimeString}
        <br />
        <strong>Cupo:</strong> {entity.capacity}
        <br />
        <strong>Inscriptos:</strong> {entity.reserveCount}
      </p>

      <div className="buttons">
        {showDay ? (
          <>
            <Button
              variant="light"
              className="button-update-entity"
              onClick={handleReserve}
              disabled={
                entity.reserved || entity.reserveCount === entity.capacity
              }
            >
              {entity.reserved ? "Reservado" : "Reservar"}
            </Button>
            {entity.reserved && (
              <Button
                variant="danger"
                className="button-delete-entity"
                onClick={handleCancelReserve}
              >
                Cancelar reserva
              </Button>
            )}
          </>
        ) : (
          <>
            <Button variant="danger" onClick={handleDelete}>
              Eliminar
            </Button>
            <Link to={`/gym-class/edit-gym-class/${entity.idGymClass}`}>
              <Button variant="green" className="button-update-entity">
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CardGymClass;
