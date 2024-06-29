import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import React, { useState } from "react";
import { deleteActivity } from "../../Activity/ActivityServices";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "./CardActivity.css";
import "react-toastify/dist/ReactToastify.css";

const CardActivity = ({ entity, type, setChanges, changes, setToast }) => {
  const [confirm, setConfirmModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };
  const onAction = async () => {
    handleConfirm();
    // toast.success("Actividad eliminada con exito")
    try {
      await deleteActivity(entity.activityName);
      setToast({
        display: true,
        message: "Actividad eliminada con exito",
        error: false,
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

  return (
    <div className="activity-section">
      <div className="card-entity-act">
        <h5 className="card-entity-name-act">{entity.activityName}</h5>
        <p className="card-entity-description-act">
          {entity.activityDescription}
        </p>

        {user?.role === "Admin" && (
          <div className="buttons">
            <Link to={`/activity/edit-activity/${entity.activityName}`}>
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
        )}
      </div>
      {confirm && (
        <ConfirmModal
          handler={handleConfirm}
          title={`Eliminar ${type}`}
          reason={"eliminar"}
          onAction={() => onAction()}
        >
          Estas seguro de que quieres eliminar{" "}
          <strong>{entity.activityName}</strong>
        </ConfirmModal>
      )}
    </div>
  );
};

export default CardActivity;
