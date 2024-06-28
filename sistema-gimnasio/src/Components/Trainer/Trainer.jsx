import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardTrainer from "./CardTrainer/CardTrainer";
import { deleteByEmail, getAllTrainers } from "./TrainerServices";
import "./Trainer.css";
import { ThemeContext } from "../Context/ThemeContext";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);
  const {theme} = useContext(ThemeContext)
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
        <Button variant="light" className={theme === "dark" ? 'button-trainer-dark' : 'button-trainer-light'}>
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
