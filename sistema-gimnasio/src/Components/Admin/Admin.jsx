import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from "../Shared/Card/Card";
import "./Admin.css";
import { getAllAdmins } from "./AdminServices";
import { deleteAdmin } from "./AdminServices";
import { toast, ToastContainer } from "react-toastify";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [changes, setChanges] = useState(false);
  const [toastModal, setToast] = useState({
    message: null,
    display: false,
    error: false,
  });

  useEffect(() => {
    getAllAdmins().then((response) => {
      setAdmins(response.data);
    });
  }, [changes]);

  useEffect(() => {
    if (toastModal.display === true && toastModal.error === false) {
      toast.success(toastModal.message);
    } else if (toastModal.display === true && toastModal.error === true) {
      toast.error(toastModal.message);
    }
  }, [toastModal]);

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
          setToast={setToast}
          setChanges={setChanges}
          changes={changes}
          deleteEntity={deleteAdmin}
        />
      ))}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Admin;
