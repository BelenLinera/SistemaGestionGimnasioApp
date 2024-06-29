import React from "react";
import ReactDOM from "react-dom";
import "./ReserveListModal.css";
import { Button } from "react-bootstrap";

const ReserveListModal = ({ entity, handler, onConfirm }) => {
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modalContent">
        <div className="modalHeader">
          <span className="modalTitle">Reservas para {entity.trainerActivity.activity.activityName}</span>
        </div>
        <div className="modalBody">
          <p><strong>Entrenador:</strong> {entity.trainerActivity.trainer.name} {entity.trainerActivity.trainer.lastName}</p>
          <ul className="reserve-list">
            {entity.reservesForClass.length>0?entity.reservesForClass.map((reserve, index) => (
              <li key={index} className="reserve-item">
                <span>{reserve.clientEmail}</span>
                <Button
                  variant="success"
                  onClick={() => onConfirm(reserve.id)}
                >
                  {!reserve.clientAttended ? "Confirmar asistencia":"Cancelar asistencia"}     
                </Button>
              </li>
            )):(<li>No hay reservas todavia</li>)}
          </ul>
        </div>
        <div className="modalFooter">
          <Button variant="secondary" onClick={handler}>
            Cerrar
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ReserveListModal;
