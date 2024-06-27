import Admin from "../Admin/Admin";
import { Route, Routes } from "react-router-dom";
import FormUser from "../Forms/FormUser/FormUser";
import FormActivity from "../Forms/FormActivity/FormActivity";
import GymClassForm from "../Forms/GymClassForm/GymClassForm";
import Client from "../Client/Client";
import Trainer from "../Trainer/Trainer";
import Activity from "../Activity/Activity";
import GymClass from "../GymClass/GymClass";
import Footer from "./Footer/Footer";
import NavBar from "./NavBar/NavBar";
import React, { useContext } from "react";
import Login from "../Login/Login";
import Home from "./Home/Home";
import RecoverPassword from "../Forms/RecoverPassword/RecoverPassword";
import ChangePasswordForm from "../Forms/ValidateTokenForm/ChangePasswordForm";
import Reserve from "../Reserve/Reserve";
import MyReserves from "../Reserve/MyReserves";
import ContenidoChat from "./ChatBot/ContenidoChat";
import UserContext from "../Context/UserContext";

const Layout = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<FormUser/>}/>
        <Route path="/forget-password" element={<RecoverPassword />} />
        <Route
          path="/forget-password/validate-token"
          element={<ChangePasswordForm />}
        />
        <Route path="/activity" element={<Activity />} />
        {user?.role === "Admin" && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/admin/create-admin"
              element={<FormUser entity={"admin"} />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/admin/edit-admin/:userEmail"
              element={<FormUser entity={"admin"} editForm={true} />}
            />

            <Route path="/client" element={<Client />} />
            <Route
              path="/client/create-client"
              element={<FormUser entity={"client"} />}
            />
            <Route
              path="/client/edit-client/:userEmail"
              element={<FormUser entity={"client"} editForm={true} />}
            />
            <Route path="/trainer" element={<Trainer />} />
            <Route
              path="/trainer/create-trainer"
              element={<FormUser entity={"trainer"} />}
            />
            <Route
              path="/trainer/edit-trainer/:userEmail"
              element={<FormUser entity={"trainer"} editForm={true} />}
            />
            <Route
              path="/activity/create-activity"
              element={<FormActivity entity={"activity"} />}
            />
            <Route
              path="/activity/edit-activity/:activityName"
              element={<FormActivity entity={"activity"} editFormAct={true} />}
            />
            <Route path="/gym-class" element={<GymClass />} />
            <Route
              path="/gym-class/create-gym-class"
              element={<GymClassForm editFormGym={false} />}
            />
            <Route
              path="/gym-class/edit-gym-class/:id"
              element={<GymClassForm editFormGym={true} />}
            />
          </>
        )}
        {user?.role && <Route path="/reserves" element={<Reserve />} />}
        {user?.role === "Client" && (
          <Route path="/my-reserves" element={<MyReserves />} />
        )}
      </Routes>
      <ContenidoChat />
      <Footer />
    </>
  );
};
//<Home isAdmin={userRole === 'Admin'}/>
export default Layout;
