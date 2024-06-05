import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Shared/Card/Card";
import { deleteByEmail, getAllTrainers } from "./TrainerServices";
import "./Trainer.css";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [changes, setChanges] = useState(false);
  useEffect(() => {
    getAllTrainers().then((response) => {
      setTrainers(response.data.$values);
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
      {trainers.map((trainer) => (
        <Card
          entity={trainer}
          type={"trainer"}
          key={trainer.email}
          setChanges={setChanges}
          changes={changes}
          deleteEntity={deleteByEmail}
        />
      ))}
    </section>
  );
};

export default Trainer;
