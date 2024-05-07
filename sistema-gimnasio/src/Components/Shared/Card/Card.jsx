import {
  faPenToSquare,
  faTrashCan,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./Card.css";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { Link } from "react-router-dom";

const Card = ({ entity, type, setChanges, changes, deleteEntity }) => {
  const [confirm, setConfirmModal] = useState(false);
  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };
  const onAction = () => {
    handleConfirm();
    deleteEntity(entity.email)
      .then(() => {
        setChanges(!changes);
      })
      .catch((error) => {
        console.error(`Error deleting ${type}:`, error);
      });
  };
  return (
    <div className="card-entity">
      <div className="icon-user">
        <FontAwesomeIcon icon={faUser} />
      </div>
      <div className="information-user-section">
        <div className="information-user">
          <h5 className="card-entity-name">
            {entity.name} {entity.lastName}
          </h5>
          <h6 className="card-entity-email mb-2 text-body-secondary">
            {entity.email}
          </h6>
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
          Estas seguro de que quieres eliminar {type !== "activity" ? "a" : ""}{" "}
          <strong>
            {entity.name} {entity.lastName}
          </strong>
          ?
        </ConfirmModal>
      )}
    </div>
  );
};

export default Card;
