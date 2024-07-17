import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import Card from "../Shared/Card/Card";
import "./Admin.css";
import { getAllAdmins } from "./AdminServices";
import { deleteAdmin } from "./AdminServices";
import { UseAxiosLoader } from "../../Hooks/UseAxiosLoader";
import { toast, ToastContainer } from "react-toastify";
import { ThemeContext } from "../Context/ThemeContext";
import UserSearch from "../Shared/UserSearch/UserSearch";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
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
  }, [changes, sendRequest]);
  useEffect(() => {
    if (toastModal.display === true && toastModal.error === false) {
      toast.success(toastModal.message);
    } else if (toastModal.display === true && toastModal.error === true) {
      toast.error(toastModal.message);
    }
  }, [toastModal]);


  const filteredAdmins = admins.filter((admin) =>
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="admin-section">
      <h2>ADMINISTRADORES</h2>
      <Link to="/admin/create-admin">
        <Button variant="light" className={theme === "dark" ? 'button-admin-dark' : 'button-admin-light'}>
          + Nuevo administrador
        </Button>
      </Link>
      <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {loading && <Spinner animation="border" />}
      <div className="admin-container-card">
      {filteredAdmins.map((admin) => (
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
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </section>
  );
};

export default Admin;
