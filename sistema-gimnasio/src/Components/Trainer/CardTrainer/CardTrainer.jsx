import {
  faPenToSquare,
  faTrashCan,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./CardTrainer.css";
import ConfirmModal from "../../Shared/ConfirmModal/ConfirmModal";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const Card = ({ entity, type, setChanges, changes, deleteEntity, setToast}) => {
  const [confirm, setConfirmModal] = useState(false);

  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };

  const onAction =async () => {
    try {
      handleConfirm();
      await deleteEntity(entity.email)
      setToast({
        display: true,
        message: "Entrenador eliminado con exito",
        error: false,
      });
      setChanges(!changes);
    } catch (error) {
      setToast({ display: true, message: error.response.data, error: true });
    }
  };

  return (
    <div className="card-entity">
      <div className="card-left">
        <div className="icon-user">
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="information-trainer">
          <h5 className="card-entity-name">
            {entity.name} {entity.lastName}
          </h5>
          <h6 className="card-entity-email mb-2 text-body-secondary">
            {entity.email}
          </h6>
        </div>
      </div>
      <div className="information-trainer-section">
        <h3>Actividades</h3>
        <div className="activities-trainer">
          {entity.trainerActivities.length > 0 ? (
            entity.trainerActivities.map((activity) => (
              <p
                className="activity-trainer"
                key={activity.activity.idActivity}
              >
                {activity.activity.activityName}
              </p>
            ))
          ) : (
            <p>Este entrenador no tiene actividades aun.</p>
          )}
        </div>
        <div className="buttons">
          <Link to={`/${type}/edit-${type}/${entity.email}`}>
            <Button variant="light" className="button-update-entity">
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </Link>
          <Button
            variant="light"
            className="button-delete-entity"
            onClick={handleConfirm}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </div>
      </div>
      {confirm && (
        <ConfirmModal
          handler={handleConfirm}
          title={`Eliminar ${type}`}
          reason={"eliminar"}
          onAction={() => onAction()}
        >
          Estás seguro de que quieres eliminar a 
          <strong>
           {} {entity.name} {entity.lastName}
          </strong>
          ?
        </ConfirmModal>
      )}
    </div>
  );
};

export default Card;
