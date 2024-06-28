import React, { useState, useEffect } from "react";
import { getAllGymClasses } from "./GymClassServices";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import "./GymClass.css";
import CardGymClass from "../Shared/CardGymClass/GymClassCard";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";

const GymClass = () => {
  const [gymClasses, setGymClasses] = useState([]);
  const [changes, setChanges] = useState([]);
  const { loading, sendRequest } = UseAxiosLoader();

  useEffect(() => {
    const fetchGymClass = async () => {
      try {
        const response = await getAllGymClasses(sendRequest);
        console.log(response);
        setGymClasses(response.data);
      } catch (error) {
        console.log("Error al fecthear las clases", error);
      }
    };

    fetchGymClass();
    // getAllGymClasses().then((response) => {
    //   setGymClasses(response.data);
    // });
  }, [changes, sendRequest]);

  return (
    <section className="gymclass-section">
      <h2>CLASES DEL GIMNASIO</h2>
      <Link to="/gym-class/create-gym-class">
        <Button variant="light" className="button-gymclass">
          + Nueva clase
        </Button>
      </Link>
      {loading && <Spinner animation="border" />}
      {gymClasses.map((gymClass) => (
        <CardGymClass
          entity={gymClass}
          type={"gymclass"}
          key={gymClass.idGymClass}
          setChanges={setChanges}
          changes={changes}
        />
      ))}
    </section>
  );
};

export default GymClass;
