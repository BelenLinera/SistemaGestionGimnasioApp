import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Shared/Card/Card";
import "./Admin.css";
import { getAllAdmins } from "./AdminServices";
import { deleteAdmin } from "./AdminServices";
import { ThemeContext } from "../Context/ThemeContext";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const {theme} = useContext(ThemeContext)
  const [changes, setChanges] = useState(false);
  useEffect(() => {
    getAllAdmins().then((response) => {
      setAdmins(response.data);
    });
  }, [changes]);
  return (
    <section className="admin-section">
      <h2>ADMINISTRADORES</h2>
      <Link to="/admin/create-admin">
        <Button variant="light" className={theme === "dark" ? 'button-admin-dark' : 'button-admin-light'}>
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
          deleteEntity={deleteAdmin}
        />
      ))}
    </section>
  );
};

export default Admin;
