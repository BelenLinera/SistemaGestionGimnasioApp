import React from 'react'
import Admin from '../Admin/Admin'
import {BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormUser from '../Forms/FormUser/FormUser';
import FormActivity from '../Forms/FormActivity/FormActivity';
import Client from '../Client/Client';
import Activity from '../Activity/Activity';

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
    
    <Route path="/client" element={<Client />}/>
    <Route path="/client/create-client" element={<FormUser entity={"client"}/>} />
    <Route path= "/client" element={<Client/>}/>
    <Route path = "/client/edit-client/:userEmail" element={<FormUser entity={"client"} editForm={true}/>} />

    <Route path="/activity" element={<Activity />}/>
    <Route path="/activity/create-activity" element={<FormActivity entity={"activity"}/>} />
    <Route path= "/activity" element={<Activity/>}/>
    <Route path = "/activity/edit-activity/:activityName" element={<FormActivity entity={"activity"} editFormAct={true}/>} />
    </Routes>
    </Router>
    </>
  )
}

export default Layout