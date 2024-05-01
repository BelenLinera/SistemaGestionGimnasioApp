import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "../Shared/Card/Card";
import "./Admin.css";
import { getAllAdmins } from "./AdminServices";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  useEffect(() => {
    getAllAdmins().then((response) => {
      setAdmins(response.data.$values);
    });
  }, [admins]);
  return (
    <section className="admin-section">
      <h2>ADMINISTRADORES</h2>
      <Button variant="light" className="button-admin">
        + Nuevo adminsitrador
      </Button>
      {admins.map((admin) => (
        <Card entity={admin} type={"admin"} key={admin.email} />
      ))}
    </section>
  );
};

export default Admin;
