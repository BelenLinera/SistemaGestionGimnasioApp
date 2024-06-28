import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Shared/Card/Card";
import "./Client.css";
import { getAllClients } from "./ClientServices";
import { deleteClient } from "./ClientServices";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [changes, setChanges] = useState(false);
  const { loading, sendRequest } = UseAxiosLoader();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await getAllClients(sendRequest);
        console.log(response);
        setClients(response.data);
      } catch (error) {
        console.log("Eror al fecthear los clientes", error);
      }
    };
    fetchClients();
    // getAllClients().then((response) => {
    //   setClients(response.data);
    // });
  }, [changes, sendRequest]);

  return (
    <section className="client-section">
      <h2>CLIENTES</h2>
      <Link to="/client/create-client">
        <Button variant="light" className="button-client">
          + Nuevo cliente
        </Button>
      </Link>
      {loading && <p>Loading...</p>}
      {clients.map((client) => (
        <Card
          entity={client}
          type={"client"}
          key={client.email}
          setChanges={setChanges}
          changes={changes}
          deleteEntity={deleteClient}
        />
      ))}
    </section>
  );
};

export default Client;
