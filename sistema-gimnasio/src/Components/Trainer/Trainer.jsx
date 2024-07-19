import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import CardTrainer from "./CardTrainer/CardTrainer";
import { deleteByEmail, getAllTrainers } from "./TrainerServices";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";
import "./Trainer.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../Context/ThemeContext";
import UserSearch from "../Shared/UserSearch/UserSearch";

const Trainer = () => {
  const [trainers, setTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const {theme} = useContext(ThemeContext)
  const [changes, setChanges] = useState(false);
  const [toastModal, setToast] = useState({
    message: null,
    display: false,
    error: false,
  });
  const { loading, sendRequest } = UseAxiosLoader();

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await getAllTrainers(sendRequest);
        console.log(response);
        setTrainers(response.data);
      } catch (error) {
        console.log("Error al traer los entrenadores", error);
      }
    };

    fetchTrainers();
  }, [changes, sendRequest]);
  useEffect(() => {
    if (toastModal.display === true && toastModal.error === false) {
      toast.success(toastModal.message);
    } else if (toastModal.display === true && toastModal.error === true) {
      toast.error("No se puede eliminar un entrenador asociado a una clase");
    }
  }, [toastModal]);


  const filteredTrainers = trainers.filter((trainer) =>
    trainer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <section className="trainer-section">
      <h2>ENTRENADORES</h2>
      <Link to="/trainer/create-trainer">
        <Button variant="light" className={theme === "dark" ? 'button-trainer-dark' : 'button-trainer-light'}>
          + Nuevo entrenador
        </Button>
      </Link>
      <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading && <Spinner animation="border" />}
      <div className="trainer-container-card">
      {filteredTrainers.map((trainer) => (
        <CardTrainer
          entity={trainer}
          type={"trainer"}
          key={trainer.email}
          setToast={setToast}
          setChanges={setChanges}
          changes={changes}
          deleteEntity={deleteByEmail}
        />
      ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Trainer;
