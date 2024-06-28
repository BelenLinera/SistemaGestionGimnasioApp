import {
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import React, { useState } from 'react';
import { deleteActivity } from '../../Activity/ActivityServices';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import "./CardActivity.css";
import { ThemeContext } from "../../Context/ThemeContext";
import { useContext } from "react";

const CardActivity = ({ entity, type, setChanges, changes}) => {
  const [confirm, setConfirmModal] = useState(false);
  
  const {theme} = useContext(ThemeContext)
  const user = JSON.parse(localStorage.getItem("user"));
  const handleConfirm = () => {
    setConfirmModal(!confirm);
  };
  const onAction = () =>  {
    handleConfirm();
    deleteActivity(entity.activityName)
    .then(() => {
      setChanges(!changes);
    })
    .catch((error) => {
      console.error("Error deleting activity:", error);
    });
  };
  
  return (
    <div className="activity-section">
      <div className={theme === "dark" ? 'card-entity-act-dark' : 'card-entity-act-light'}> 
        <h5 className="card-entity-name-act">
          {entity.activityName}
        </h5>
        <p className="card-entity-description-act">
          {entity.activityDescription}
        </p>
        
        {user?.role ==="Admin" && (
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
          Estas seguro de que quieres eliminar {" "}
          <strong>
            {entity.activityName}
          </strong>
        </ConfirmModal>
      )}
    </div>
  );
};

export default CardActivity;
