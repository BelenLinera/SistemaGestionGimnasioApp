import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "../Shared/Card/Card";
import "./Admin.css";
import { getAllAdmins } from "./AdminServices";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [changes, setChanges] = useState(false);
  useEffect(() => {
    getAllAdmins().then((response) => {
      setAdmins(response.data.$values)

    }).finally(console.log("Terminado"));
  }, [changes]);
  return (
    <section className="admin-section">
      <h2>ADMINISTRADORES</h2>
      <Button variant="light" className="button-admin">
        + Nuevo administrador
      </Button>
      {admins.map((admin) => (
        <Card entity={admin} type={"admin"} key={admin.email} setChanges={setChanges} changes={changes} />
      ))}
    </section>
  );
};

export default Admin;
