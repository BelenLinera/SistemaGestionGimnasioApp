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
import {
  cancelGymClassOnDate,
  deleteGymClass,
} from "../../GymClass/GymClassServices";
import ReserveListModal from "../../Reserve/ReserveListModal/ReserveListModal";
import "./GymClassCard.css";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { ThemeContext } from "../../Context/ThemeContext";

const CardGymClass = ({ entity, setChanges, changes, showDay,setToast }) => {
  const { theme } = useContext(ThemeContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirmModal] = useState(false);
  const [activeCancellClass, setActiveCancellClass] = useState(false);

  const handleConfirmDeleteClass = () => {
    setConfirmModal(!confirm);
  };
  const handleConfirmCancelClass = () => {
    setConfirmModal(!confirm);
    setActiveCancellClass(!activeCancellClass);
  };

  const handleDeleteClass = async () => {
    try {
      await deleteGymClass(entity.idGymClass);
      setToast({
        display: true,
        message: "Clase eliminada con exito",
        error: false,
      });
      setChanges(!changes);
    } catch (error) {
      setToast({
        display: true,
        message: "No se pudo eliminar la clase",
        error: true,
      });
    }
  };
  const handleReserve = async () => {
    if (entity.reserved || entity.reserveCount === entity.capacity) {
      return setToast({
        display: true,
        message: "Capacidad maxima alcanzada",
        error: false,
      });
    }
    try {
      const parsedDate = parse(entity.datetimeString, "dd/MM/yyyy", new Date());
      const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");
      await makeReserve({
        IdGymClass: entity.idGymClass,
        dateClass: formattedDate,
      });
      setChanges(!changes);
    } catch (error) {
      setToast({
        display: true,
        message: error.response.data,
        error: true,
      });
    }
  };
  const handleCancelClass = async () => {
    try {
      const parsedDate = parse(entity.datetimeString, "dd/MM/yyyy", new Date());
      const formattedDate = format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss");
      await cancelGymClassOnDate(entity.idGymClass, formattedDate);
      setChanges(!changes);
    } catch (error) {
      setToast({
        display: true,
        message: "Hubo un error al cancelar la clase",
        error: false,
      });
    }
  };
  const handleCancelReserve = async () => {
    try {
      await cancelReserve(entity.idReserve);
      setChanges(!changes);
    } catch (error) {
      setToast({
        display: true,
        message: "No se pudo cancelar la reserva",
        error: false,
      });
    }
  };

  const handleConfirmAttendance = async (idReserve) => {
    try {
      await confirmAssistance(idReserve);
      setChanges(!changes);
    } catch (error) {
      setToast({
        display: true,
        message: "No se pudo desconfirmar la asistencia",
        error: false,
      });
    }
  };

  return (
    <div className={theme === "dark" ? 'card-gymclass-dark' : 'card-gymclass-light'}>
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
          !showDay && (
            <>
              <Button variant="danger" onClick={handleConfirmDeleteClass}>
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
        {showDay && (user.role === "Trainer" || user.role === "Admin") && (
          <>
            <Button variant="info" onClick={() => setShowModal(true)}>
              Ver reservas
            </Button>
          </>
        )}
        {showDay && user.role === "Admin" && (
          <>
            <Button variant="danger" onClick={handleConfirmCancelClass}>
              Cancelar clase
            </Button>
          </>
        )}
      </div>
      {confirm &&(
        <ConfirmModal
          handler={handleConfirmDeleteClass}
          title="Eliminar clase"
          reason="eliminar"
          onAction={handleDeleteClass}
        >
          Estás seguro de que quieres eliminar la clase{" "}
          <strong>{entity.trainerActivity.activity.activityName}</strong>?
        </ConfirmModal>
      )}

      {showModal && (
        <ReserveListModal
          entity={entity}
          handler={() => setShowModal(false)}
          onConfirm={handleConfirmAttendance}
        />
      )}
      {confirm && activeCancellClass && (
        <ConfirmModal
          handler={handleConfirmCancelClass}
          title="Cancelar clase"
          reason={"enviar"}
          onAction={handleCancelClass}
        >
          Estás seguro de que quieres eliminar la clase{" "}
          <strong>{entity.trainerActivity.activity.activityName}</strong>?
        </ConfirmModal>
      )}
    </div>
  );
};

export default CardGymClass;
