import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Shared/Card/Card";
import "./Client.css";
import { getAllClients } from "./ClientServices";
import { deleteClient } from "./ClientServices";

const Client = () => {
  const [clients, setClients] = useState([]);
  const [changes, setChanges] = useState(false);
  useEffect(() => {
    getAllClients().then((response) => {
      setClients(response.data);
    });
  }, [changes]);
  return (
    <section className="client-section">
      <h2>CLIENTES</h2>
      <Link to="/client/create-client">
        <Button variant="light" className="button-client">
          + Nuevo cliente
        </Button>
      </Link>
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
