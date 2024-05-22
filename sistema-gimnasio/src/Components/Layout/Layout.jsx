import React from 'react'
import Admin from '../Admin/Admin'
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormUser from '../Forms/FormUser/FormUser';

const Layout = () => {
  return (
    <>
    {/*<Login></Login>
    <Register></Register>
    
    <Footer></Footer>
    */}
    <Router>
    <Routes>
    <Route path="/" element={<Admin />}/>
    <Route path="/admin/create-admin" element={<FormUser entity={"admin"}/>} />
    <Route path= "/admin" element={<Admin/>}/>
    <Route path = "/admin/edit-admin/:userEmail" element={<FormUser entity={"admin"} editForm={true}/>} />
    </Routes>
    </Router>
    </>
  )
}

export default Layout