import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import CardTrainer from "./CardTrainer/CardTrainer";
import { deleteByEmail, getAllTrainers } from "./TrainerServices";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";
import "./Trainer.css";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [changes, setChanges] = useState(false);
  const { loading, sendRequest } = UseAxiosLoader();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await getAllTrainers(sendRequest);
        console.log(response);
        setTrainers(response.data);
      } catch (error) {
        console.log("Error al fecthear los trainers", error);
      }
    };

    fetchTrainers();
    // getAllTrainers().then((response) => {
    //   setTrainers(response.data);
    // });
  }, [changes, sendRequest]);
  return (
    <section className="trainer-section">
      <h2>ENTRENADORES</h2>
      <Link to="/trainer/create-trainer">
        <Button variant="light" className="button-trainer">
          + Nuevo entrenador
        </Button>
      </Link>
      {loading && <Spinner animation="border" />}
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
    </section>
  );
};

export default Trainer;
