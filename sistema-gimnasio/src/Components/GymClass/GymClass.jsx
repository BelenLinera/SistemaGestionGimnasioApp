import React, { useState, useEffect, useContext } from "react";
import { getAllGymClasses } from "./GymClassServices";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import "./GymClass.css";
import CardGymClass from "../Shared/CardGymClass/GymClassCard";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from '../Context/ThemeContext';

const GymClass = () => {
  const {theme} = useContext(ThemeContext)
  const [gymClasses, setGymClasses] = useState([]);
  const [changes, setChanges] = useState([]);
  const { loading, sendRequest } = UseAxiosLoader();
  const [toastModal, setToast] = useState({
    message: null,
    display: false,
    error: false,
  });

  useEffect(() => {
    const fetchGymClass = async () => {
      try {
        const response = await getAllGymClasses(sendRequest);
        setGymClasses(response.data);
      } catch (error) {
        toast.error(error.response.data);
      }
    };
    
    fetchGymClass();
  }, [changes, sendRequest]);
  useEffect(() => {
    if (toastModal.display === true && toastModal.error === false) {
      toast.success(toastModal.message);
    } else if (toastModal.display === true && toastModal.error === true) {
      toast.error(toastModal.message);
    }
  }, [toastModal]);
  
  return (
    <section className="gymclass-section">
        <h2>CLASES DEL GIMNASIO</h2>
        <Link to="/gym-class/create-gym-class">
            <Button variant="light" className={theme === "dark" ? 'button-gymclass-dark' : 'button-gymclass-light'}>
                + Nueva clase
            </Button>
        </Link>
      {loading && <Spinner animation="border" />}
        <div className='gymclass-container-card'>
        {gymClasses.map((gymClass) => (
            <CardGymClass
                entity={gymClass}
                type={"gymclass"}
                key={gymClass.idGymClass}
                setChanges={setChanges}
                changes={changes}
                setToast={setToast}
            />
        ))}
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
)};

export default GymClass;