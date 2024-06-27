import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardTrainer from "./CardTrainer/CardTrainer";
import { deleteByEmail, getAllTrainers } from "./TrainerServices";
import "./Trainer.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [changes, setChanges] = useState(false);
  const getTrainers = async () => {
    try {
      const response = await getAllTrainers()
      setTrainers(response.data);
    }
    catch(error) {
      toast.error(error.response.data);
    }
  }
 useEffect(() => {
    getTrainers()
  }, [changes]);
  return (
    <section className="trainer-section">
      <h2>ENTRENADORES</h2>
      <Link to="/trainer/create-trainer">
        <Button variant="light" className="button-trainer">
          + Nuevo entrenador
        </Button>
      </Link>
      {trainers.map((trainer) => (
        <CardTrainer
          entity={trainer}
          type={"trainer"}
          key={trainer.email}
          setChanges={setChanges}
          changes={changes}
          deleteEntity={deleteByEmail}
        />
      ))}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Trainer;
