import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Shared/Card/Card";
import "./Admin.css";
import { getAllAdmins } from "./AdminServices";
import { deleteAdmin } from "./AdminServices";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [changes, setChanges] = useState(false);
  const { loading, sendRequest } = UseAxiosLoader();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await getAllAdmins(sendRequest);
        console.log(response);
        setAdmins(response.data);
      } catch (error) {
        console.log("Error al fecthear los clientes", error);
      }
    };
    fetchAdmins();

    // getAllAdmins().then((response) => {
    //   setAdmins(response.data);
    // });
  }, [changes, sendRequest]);
  return (
    <section className="admin-section">
      <h2>ADMINISTRADORES</h2>
      <Link to="/admin/create-admin">
        <Button variant="light" className="button-admin">
          + Nuevo administrador
        </Button>
      </Link>
      {loading && <p>Loading...</p>}
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
