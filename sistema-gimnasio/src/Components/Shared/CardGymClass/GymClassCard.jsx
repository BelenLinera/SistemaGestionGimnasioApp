import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { format, parse } from "date-fns";
import { Button } from "react-bootstrap";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  cancelReserve,
  confirmAssistance,
  makeReserve,
} from "../../Reserve/ReserveService";
import { deleteGymClass } from "../../GymClass/GymClassServices";
import UserContext from "../../Context/UserContext";
import ReserveListModal from "../../Reserve/ReserveListModal/ReserveListModal";
import "./GymClassCard.css";

const CardGymClass = ({ entity, setChanges, changes, showDay }) => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClass = async () => {
    try {
      await deleteGymClass(entity.idGymClass);
      setChanges(!changes);
    } catch (error) {
      console.error("Failed to delete gym class", error);
    }
  };
  console.log(entity);
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

  const handleConfirmAttendance = async (idReserve) => {
    try {
      await confirmAssistance(user.token, idReserve);
      setChanges(!changes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-gymclass">
      <h5 className="card-title">
        {entity.trainerActivity.activity.activityName}
      </h5>
      <ul className="card-details">
        <li>
          <strong>Entrenador:</strong> {entity.trainerActivity.trainer.name}{" "}
          {entity.trainerActivity.trainer.lastName}
        </li>
        <li>
          <strong>Día:</strong> {entity.dayName}
        </li>
        <li>
          <strong>Horario:</strong> {entity.timeClass}
        </li>
        {showDay && (
          <li>
            <strong>Fecha Completa:</strong> {entity.datetimeString}
          </li>
        )}
        {entity.capacity && (
          <>
            <li>
              <strong>Cupo:</strong> {entity.capacity}
            </li>
            {showDay && (
              <li>
                <strong>Inscriptos:</strong> {entity.reserveCount}
              </li>
            )}
          </>
        )}
      </ul>

      <div className="buttons">
        {showDay && user.role === "Client" ? (
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
            {entity.reserved && entity.canBeCancelled && (
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
          !showDay &&  (
            <>
              <Button variant="danger" onClick={handleDeleteClass}>
                Eliminar
              </Button>
              <Link to={`/gym-class/edit-gym-class/${entity.idGymClass}`}>
                <Button variant="green" className="button-update-entity">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </Button>
              </Link>
            </>
          )
        )}
        {showDay && (user.role === "Trainer" || user.role === "Admin") &&  (
          <>
            <Button variant="info" onClick={() => setShowModal(true)}>
              Ver reservas
            </Button>
          </>
        )}
      </div>

      {showModal && (
        <ReserveListModal
          entity={entity}
          handler={() => setShowModal(false)}
          onConfirm={handleConfirmAttendance}
        />
      )}
    </div>
  );
};

export default CardGymClass;
