import React from "react";
import ReactDOM from "react-dom";
import "./ConfirmModal.css";
import { Button } from "../Button/Button";

const ConfirmModal = ({
  children,
  handler,
  title,
  reason,
  onAction,
  disabled,
}) => {
  const classByReason = {
    enviar: "submitButton",
    eliminar: "deleteButton",
  };
  return ReactDOM.createPortal(
    <div className="modal">
      <div className="modalContent">
        <div className="modalHeader">
          <span className="modalTitle">{title}</span>
          <span className="modalCloser" onClick={handler}>
            &times;
          </span>
        </div>
        <p className="modalMessage">{children}</p>
        <div className="modalButtons">
          <Button
            action={handler}
            text={"Cancelar"}
            classNameButton={"cancelButton"}
          />
          <Button
            action={onAction}
            text={`${reason.charAt(0).toUpperCase()}${reason.substring(1)}`}
            classNameButton={classByReason[reason]}
            disabled={disabled}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
