import {
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import React, { useState } from 'react'
import { deleteActivity } from '../../Activity/ActivityServices';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import "./CardActivity.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardActivity = ({entity, type, setChanges, changes, deleteEntity}) => {
  const [confirm, setConfirmModal] = useState(false);
  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };
  const onAction = () =>  {
    handleConfirm();
    toast.success("Actividad eliminada con exito")
    deleteActivity(entity.activityName)
    .then(() => {
      setChanges(!changes);
    })
    .catch((error) => {
      console.error("Error deleting admin:", error);
    });
  };
    return (
    <div className="activity-section">
      <div className="card-entity-act"> 
          <h5 className="card-entity-name-act">
            {entity.activityName}
          </h5>
          <p className="card-entity-description-act">
            {entity.activityDescription}
          </p>
        
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
            <FontAwesomeIcon icon ={faTrashCan} />
          </Button>
        </div>
      </div> 
      {confirm && (
        <ConfirmModal
          handler={handleConfirm}
          title={`Eliminar ${type}`}
          reason={"eliminar"}
          onAction={()=> onAction()}
        >
          Estas seguro de que quieres eliminar {" "}
          <strong>
            {entity.activityName}
          </strong>
          </ConfirmModal>
      )}
     <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default CardActivity