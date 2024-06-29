import React, { useState, useEffect } from "react";
import { getAllGymClasses } from "./GymClassServices";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./GymClass.css";
import CardGymClass from "../Shared/CardGymClass/GymClassCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GymClass = () => {
  const [gymClasses, setGymClasses] = useState([]);
  const [changes, setChanges] = useState([]);
  const [toastModal, setToast] = useState({
    message: null,
    display: false,
    error: false,
  });

  const getGymClasses = async () => {
    try {
      const response = await getAllGymClasses();
      setGymClasses(response.data);
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    if (toastModal.display === true && toastModal.error === false) {
      toast.success(toastModal.message);
    } else if (toastModal.display === true && toastModal.error === true) {
      toast.error(toastModal.message);
    }
  }, [toastModal]);

  useEffect(() => {
    getGymClasses();
  }, [changes]);

  return (
    <section className="gymclass-section">
      <h2>CLASES DEL GIMNASIO</h2>
      <Link to="/gym-class/create-gym-class">
        <Button variant="light" className="button-gymclass">
          + Nueva clase
        </Button>
      </Link>
      {gymClasses.map((gymClass) => (
        <CardGymClass
          entity={gymClass}
          type={"gymclass"}
          key={gymClass.idGymClass}
          setToast={setToast}
          setChanges={setChanges}
          changes={changes}
        />
      ))}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default GymClass;