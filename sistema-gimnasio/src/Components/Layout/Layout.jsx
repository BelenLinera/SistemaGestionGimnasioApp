import React from 'react'
import Admin from '../Admin/Admin'
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormUser from '../Forms/FormUser/FormUser';
import Login from '../Login/Login';
import Home from './Home/Home';
import RecoverPassword from '../Forms/RecoverPassword/RecoverPassword';
import ChangePasswordForm from '../Forms/ValidateTokenForm/ChangePasswordForm';

const Layout = () => {
  return (
    <>
    {/*<Login></Login>
    <Register></Register>
    
    <Footer></Footer>
    */}
    <Router>
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/admin/create-admin" element={<FormUser entity={"admin"}/>} />
    <Route path= "/admin" element={<Admin/>}/>
    <Route path= "/forget-password" element={<RecoverPassword/>}/>
    <Route path= "/forget-password/validate-token" element={<ChangePasswordForm/>}/>

    <Route path = "/admin/edit-admin/:userEmail" element={<FormUser entity={"admin"} editForm={true}/>} />
    </Routes>
    </Router>
    </>
  )
}

export default Layout