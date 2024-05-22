import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Shared/Card/Card";
import "./Admin.css";
import { getAllAdmins } from "./AdminServices";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [changes, setChanges] = useState(false);
  useEffect(() => {
    getAllAdmins().then((response) => {
      setAdmins(response.data.$values);
    });
  }, [changes]);
  return (
    <section className="admin-section">
      <h2>ADMINISTRADORES</h2>
      <Link to="/admin/create-admin">
        <Button variant="light" className="button-admin">
          + Nuevo administrador
        </Button>
      </Link>
      {admins.map((admin) => (
        <Card
          entity={admin}
          type={"admin"}
          key={admin.email}
          setChanges={setChanges}
          changes={changes}
        />
      ))}
    </section>
  );
};

export default Admin;
