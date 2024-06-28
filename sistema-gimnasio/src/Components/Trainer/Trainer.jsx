import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardTrainer from "./CardTrainer/CardTrainer";
import { deleteByEmail, getAllTrainers } from "./TrainerServices";
import "./Trainer.css";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [changes, setChanges] = useState(false);
  useEffect(() => {
    getAllTrainers().then((response) => {
      setTrainers(response.data);
    });
  }, [changes]);
  return (
    <section className="trainer-section">
      <h2>ENTRENADORES</h2>
      <Link to="/trainer/create-trainer">
        <Button variant="light" className="button-trainer">
          + Nuevo entrenador
        </Button>
      </Link>
      <div className="trainer-container-card">
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
      </div>
    </section>
  );
};

export default Trainer;
