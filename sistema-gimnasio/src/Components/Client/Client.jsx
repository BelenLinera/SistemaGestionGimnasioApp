import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Card from "../Shared/Card/Card";
import "./Client.css";
import { getAllClients } from "./ClientServices";
import { deleteClient } from "./ClientServices";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../Context/ThemeContext";
import UserSearch from "../Shared/UserSearch/UserSearch";

const Client = () => {
  const [clients, setClients] = useState([]);
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
    const fetchClients = async () => {
      try {
        const response = await getAllClients(sendRequest);
        setClients(response.data);
      } catch (error) {
        toast.error("Error al traer los clientes");
      }
    };
    fetchClients();
  }, [changes, sendRequest]);
  useEffect(() => {
    if (toastModal.display === true && toastModal.error === false) {
      toast.success(toastModal.message);
    } else if (toastModal.display === true && toastModal.error === true) {
      toast.error(toastModal.message);
    }
  }, [toastModal]);

  const filteredClients = clients.filter((client) =>
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <section className="client-section">
      <h2>CLIENTES</h2>
      <Link to="/client/create-client">
        <Button
          variant="light"
          className={
            theme === "dark" ? "button-client-dark" : "button-client-light"
          }
        >
          + Nuevo cliente
        </Button>
      </Link>
      {loading && (
        <div className="spinner-container">
          <Spinner animation="border" />
        </div>
      )}
      <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {clients.length === 0 && !loading && (
        <p>No hay clientes disponibles</p>
      )}
      <div className="client-container-card">
        {filteredClients.map((client) => (
          <Card
            entity={client}
            type={"client"}
            key={client.email}
            setToast={setToast}
            setChanges={setChanges}
            changes={changes}
            deleteEntity={deleteClient}
          />
        ))}
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Client;
