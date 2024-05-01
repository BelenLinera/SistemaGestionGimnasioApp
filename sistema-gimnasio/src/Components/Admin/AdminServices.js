import api from "../../api"

const getAllAdmins = () => { return api.get("/api/Admin")}

const deleteAdmin = (email) => { return api.delete(`/api/Admin/${email}`)}

export {getAllAdmins,deleteAdmin}